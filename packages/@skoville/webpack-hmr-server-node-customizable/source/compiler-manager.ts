import * as webpack from 'webpack';
import MemoryFileSystem = require('memory-fs');
import * as path from 'path';
import * as fs from 'fs';
import { Log, CompilerUpdate } from '@skoville/webpack-hmr-shared-universal-utilities';
import { SkovilleWebpackPlugin } from './webpack-plugin';
import * as ansicolor from 'ansicolor';

type FileSystem = typeof fs | MemoryFileSystem;

const WEBPACK_PLUGIN_TAP_NAME = nameof(SkovilleWebpackPlugin);

export class CompilerManager {
    private readonly fs: FileSystem;
    private log: Log.Logger;
    private readonly publicPath: string;

    private valid: boolean;
    private pendingReadStreamHandlers: Function[];
    private updates: CompilerUpdate[];

    public constructor(
        private readonly compiler: webpack.Compiler,
        private readonly compilerUpdateHandler: () => void,
        memoryFS: boolean, log: Log.Logger, name: string) {
        if(memoryFS) {
            this.fs = new MemoryFileSystem();
            compiler.outputFileSystem = this.fs;
        } else {
            this.fs = fs;
        }
        this.log = log.clone(ansicolor.green(`[config ${ansicolor.magenta(name)}] `));
        this.valid = false;
        this.pendingReadStreamHandlers = [];
        this.publicPath = (() => {
            const {compiler} = this;
            const publicPath = (compiler.options.output && compiler.options.output.publicPath) || "/";
            return publicPath.endsWith("/") ? publicPath : publicPath + "/";
        })();
        this.updates = [];
        this.addHooks();
    }

    public getUpdates() {
        return this.updates;
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
            else this.pendingReadStreamHandlers.push(attemptToRead);
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
        // this.compiler.hooks.compile.tap(WEBPACK_PLUGIN_TAP_NAME, () => {console.log("inner compile hook");this.sendCompilerNotification({type:SkovilleServerNotification.Type.Recompiling});});
        this.compiler.hooks.invalid.tap(WEBPACK_PLUGIN_TAP_NAME, () => {console.log("inner invalid hook");this.invalidate();});//this.sendCompilerNotification({type:SkovilleServerNotification.Type.Recompiling});});
        this.compiler.hooks.run.tap(WEBPACK_PLUGIN_TAP_NAME, () => {console.log("inner run hook");this.invalidate()});
        this.compiler.hooks.watchRun.tap(WEBPACK_PLUGIN_TAP_NAME, () => {console.log("inner watchRun hook");this.invalidate()});
        this.compiler.hooks.done.tap(WEBPACK_PLUGIN_TAP_NAME, stats => {
            const {compilation} = stats;
            if (!compilation.hash) throw new Error("no hash");
            this.log.trace("HASH ON DONE HOOK IS = " + ansicolor.bgWhite(ansicolor.black(compilation.hash)));
            this.updates.push({
                hash: compilation.hash,
                errors: compilation.errors,
                warnings: compilation.warnings,
                assets: compilation.assets
            });
            this.compilerUpdateHandler();

            // Now that compilation is complete, we may let all pending read file commands go through.
            this.valid = true;
            if(this.pendingReadStreamHandlers.length) {
                this.pendingReadStreamHandlers.forEach(callback => callback());
                this.pendingReadStreamHandlers = [];
            }

            // Consider doing the following after the nextTick, which is done in Webpack-Dev-Middleware
            this.logCompilationResult(stats);
        });
    }

    private logCompilationResult(stats: webpack.Stats) {
        let message = 'Compiled successfully.';
        if (stats.hasErrors()) {
            message = 'Failed to compile.';
        } else if (stats.hasWarnings()) {
            message = 'Compiled with warnings.';
        }
        this.log.info(message);
        const toStringOptions = this.compiler.options.stats || "minimal"; // "verbose"; // TODO: Use verbose but parse through the stats in order to get list of all dependencies then bring to dashboard.
        if (stats.hasErrors()) this.log.error(stats.toString(toStringOptions));
        else if (stats.hasWarnings()) this.log.warn(stats.toString(toStringOptions));
        else this.log.info(stats.toString(toStringOptions));
    }

    private invalidate() {
        if(this.valid) this.log.info("Recompiling...");
        this.valid = false;
    }

}