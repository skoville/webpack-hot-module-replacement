import * as webpack from 'webpack';
import MemoryFileSystem = require('memory-fs');
import * as path from 'path';
import * as fs from 'fs';
import { Log, SkovilleServerNotification } from '@skoville/webpack-hmr-shared-universal-utilities';
import { SkovilleWebpackPlugin } from './webpack-plugin';
import * as ansicolor from 'ansicolor';

type FileSystem = typeof fs | MemoryFileSystem;

const WEBPACK_PLUGIN_TAP_NAME = nameof(SkovilleWebpackPlugin);

export class CompilerManager {
    private readonly fs: FileSystem;
    private log: Log.Logger;
    private readonly publicPath: string;

    private valid: boolean;
    private compilationCallbacks: Function[];
    private latestUpdateNotification: SkovilleServerNotification.Body | undefined;

    public constructor(
        private readonly compiler: webpack.Compiler,
        private readonly compilerNotificationHandler: (compilerNotification: SkovilleServerNotification.Body) => void,
        memoryFS: boolean, log: Log.Logger) {
        if(memoryFS) {
            this.fs = new MemoryFileSystem();
            compiler.outputFileSystem = this.fs;
        } else {
            this.fs = fs;
        }
        this.log = log.clone("[compiling] ");
        this.valid = false;
        this.compilationCallbacks = [];
        this.publicPath = (() => {
            const {compiler} = this;
            const publicPath = (compiler.options.output && compiler.options.output.publicPath) || "/";
            return publicPath.endsWith("/") ? publicPath : publicPath + "/";
        })();

        this.addHooks();
    }

    public getLatestUpdateNotification() {
        return this.latestUpdateNotification;
    }

    public async getReadStream(requestPath: string): Promise<fs.ReadStream|false> {
        this.log.trace("getReadStream called with path = " + requestPath);
        const fsPath = this.getFsPathFromRequestPath(requestPath);
        if(!fsPath) return false;
        // Don't stream the file until compilation is done.
        return await new Promise<fs.ReadStream | false>(resolve => {
            const attemptToRead = () => {
                this.fs.exists(fsPath, exists => {
                    if(exists) {
                        this.fs.stat(fsPath, (_err, stats) => {
                            if(stats.isFile()) {
                                this.log.info("File located. Returning ReadStream.");
                                resolve(this.fs.createReadStream(fsPath));
                            } else {
                                this.log.error("Path exists, but is not a file.");
                                resolve(false);
                            }
                        })
                    } else {
                        this.log.error("File does not exist.");
                        resolve(false);
                    }
                });
            };
            if(this.valid) attemptToRead();
            else this.compilationCallbacks.push(attemptToRead);
        });
    }

    private getFsPathFromRequestPath(requestPath: string) {
        if(requestPath.indexOf(this.publicPath) !== -1) {
            const outputPath = (this.compiler as any).outputPath;
            const adjustedPath = path.resolve(outputPath + '/' + (requestPath.substring(this.publicPath.length)));
            const {compiler} = this;
            this.log.info(`${nameof(this.publicPath)}: '${this.publicPath}', ${nameof(requestPath)}: '${requestPath}', ${nameof.full(compiler.outputPath)}: '${outputPath}'`);
            this.log.debug(adjustedPath);
            return adjustedPath;
        } else {
            this.log.error(`Request path '${requestPath}' will not be served because it is not under webpack.config.output.publicPath of '${this.publicPath}'`);
            return false;
        }
    }

    private addHooks() {
        this.compiler.hooks.compile.tap(WEBPACK_PLUGIN_TAP_NAME, () => {console.log("inner compile hook");this.sendCompilerNotification({type:SkovilleServerNotification.Type.Recompiling});});
        this.compiler.hooks.invalid.tap(WEBPACK_PLUGIN_TAP_NAME, () => {console.log("inner invalid hook");this.invalidate();this.sendCompilerNotification({type:SkovilleServerNotification.Type.Recompiling});});
        this.compiler.hooks.run.tap(WEBPACK_PLUGIN_TAP_NAME, () => {console.log("inner run hook");this.invalidate()});
        this.compiler.hooks.watchRun.tap(WEBPACK_PLUGIN_TAP_NAME, () => {console.log("inner watchRun hook");this.invalidate()});
        this.compiler.hooks.done.tap(WEBPACK_PLUGIN_TAP_NAME, stats => {
            if(stats.hash !== undefined) {
                this.log = this.log.clone(`[${ansicolor.lightGreen(stats.hash)}] `);
            }

            const {compilation} = stats;
            if(compilation.errors.length === 0 && Object.values(compilation.assets).every(asset => !(asset as any).emitted)) {
                this.sendCompilerNotification({type:SkovilleServerNotification.Type.NoChange});
            } else {
                this.sendUpdateMessage(stats);
            }
            this.valid = true;

            let message = 'Compiled successfully.';
            if (stats.hasErrors()) {
                message = 'Failed to compile.';
            } else if (stats.hasWarnings()) {
                message = 'Compiled with warnings.';
            }
            this.log.info(message);

            // Consider doing the following after the nextTick, which is done in Webpack-Dev-Middleware
            const toStringOptions = this.compiler.options.stats || "minimal"; // "verbose"; // TODO: Use verbose but parse through the stats in order to get list of all dependencies then bring to dashboard.
            if (stats.hasErrors()) this.log.error(stats.toString(toStringOptions));
            else if (stats.hasWarnings()) this.log.warn(stats.toString(toStringOptions));
            else this.log.info(stats.toString(toStringOptions));
            
            if(this.compilationCallbacks.length) {
                this.compilationCallbacks.forEach(callback => callback());
                this.compilationCallbacks = [];
            }
        });
    }

    private sendUpdateMessage(stats: webpack.Stats) {
        const statsJSON = stats.toJson({
            all: false,
            hash: false,
            assets: false,
            warnings: true,
            errors: true,
            errorDetails: false
        });
        if (stats.hash === undefined) {
            throw new Error("hash is undefined for webpack.Stats");
        }
        const updateMessage: SkovilleServerNotification.Body = {
            type: SkovilleServerNotification.Type.Update,
            data: {
                hash: stats.hash,
                publicPath: this.publicPath,
                assets: Object.keys(stats.compilation.assets),
                errors: statsJSON.errors,
                warnings: statsJSON.warnings
            }
        };
        this.sendCompilerNotification(updateMessage);
    }

    private sendCompilerNotification(notification: SkovilleServerNotification.Body) {
        if(notification.type === SkovilleServerNotification.Type.Update) {
            this.latestUpdateNotification = notification;
        }
        this.compilerNotificationHandler(notification);
    }

    private invalidate() {
        if(this.valid) this.log.info("Recompiling...");
        this.valid = false;
    }

}