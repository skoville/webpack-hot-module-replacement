import * as webpack from 'webpack';
import * as memfs from 'memfs';
import * as path from 'path';
import * as fs from 'fs';
import * as vm from 'vm';
import { Log, CompilerUpdate } from '@skoville/webpack-hmr-shared-universal-utilities';
import { SkovilleWebpackPlugin } from './skoville-plugin';
import * as ansicolor from 'ansicolor';
import { injectWebpackHotBootstrapModifications } from './webpack-bootstrap-source-injection';
import { generateHash } from '../generate-hash';
import { Module } from 'webpack';
import {  } from 'webpack-sources';

type FileSystem = typeof fs;

const WEBPACK_PLUGIN_TAP_NAME = nameof(SkovilleWebpackPlugin);

const supportedBundleTypes = {
    'node': true,
    'web': true,
};
type SupportedBundleType = keyof typeof supportedBundleTypes;

function isSupportedBundleTarget(bundleType: string): bundleType is SupportedBundleType {
    return supportedBundleTypes.hasOwnProperty(bundleType);
}

type ModuleMonitor = {
    webpackHash: string;
    source: string;
    hotUpdate: any;
    skovilleHash: string;
}

// TODO: PR to @types/webpack for definition of compilation.modules
export class CompilerManager {
    private readonly fs: FileSystem;
    private log: Log.Logger;
    private readonly publicPath: string;

    private valid: boolean;
    private pendingCallbacksWhichRequireStableCompilation: Function[];
    private updates: CompilerUpdate[];
    private bundleTarget: string;
    private moduleIdToModuleMonitorMap: Map<string, ModuleMonitor>;
    private currentCompilation: webpack.Compilation | undefined;

    public constructor(
        private readonly compiler: webpack.Compiler,
        private readonly compilerUpdateHandler: () => void,
        memoryFS: boolean, log: Log.Logger, private readonly webpackConfigurationName: string) {
        // TODO: write a custom compiler.outputFileSystem implementation which can intercept hot updates and add them to updates, while lettins all other
        //       operations pass through to a .skoville folder by default or a custom folder if set.
        if(memoryFS) {
            this.fs = memfs.fs as any as typeof fs;
            compiler.outputFileSystem = this.fs as any;
        } else {
            this.fs = fs;
        }
        this.log = log.clone(ansicolor.green(`[config ${ansicolor.magenta(webpackConfigurationName)}] `));
        this.valid = false;
        this.pendingCallbacksWhichRequireStableCompilation = [];
        this.publicPath = (() => {
            const {compiler} = this;
            const publicPath = (compiler.options.output && compiler.options.output.publicPath);
            if (publicPath === undefined) {
                throw new Error(`Logical error detected: ${nameof(publicPath)} is undefined in constructor of ${nameof(CompilerManager)}`);
            } else if (typeof publicPath !== 'string') {
                throw new Error(`Type error detected: ${nameof(publicPath)} is ${typeof publicPath} when string was expected in constructor of ${nameof(CompilerManager)}`);
            }
            return publicPath.endsWith("/") ? publicPath : publicPath + "/";
        })();
        this.updates = [];
        if (compiler.options.target === undefined) {
            throw new Error(`${nameof.full(compiler.options.target)} may not be undefined. It is currently undefined for config name ${webpackConfigurationName}`);
        }
        if (typeof(compiler.options.target) === 'function') {
            throw new Error(`${nameof.full(compiler.options.target)} may not be a function. It is currently a function for the config name ${webpackConfigurationName}`);
        }
        this.bundleTarget = compiler.options.target;
        this.moduleIdToModuleMonitorMap = new Map();
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
                (this.fs as typeof fs).stat(fsPath, (error, stats) => {
                    if (error) {
                        if (error.code === 'ENOENT') {
                            this.log.error("File does not exist");
                        } else {
                            this.log.error("Error when reading file: " + error.code);
                        }
                        resolve(false);
                    } else if (stats.isFile()) {
                        this.log.info("File located. Returning ReadStream.");
                        resolve((this.fs as typeof fs).createReadStream(fsPath));
                    } else {
                        this.log.error("Path exists, but is not a file.");
                        resolve(false);
                    }
                });
            };
            if(this.valid) attemptToRead();
            else this.pendingCallbacksWhichRequireStableCompilation.push(attemptToRead);
        });
    }

    public async getModuleSource(moduleId: string): Promise<string | undefined> {
        return new Promise<string | undefined>(resolve => {
            const getSource = () => {
                if (this.currentCompilation === undefined) {
                    throw new Error(`Implementation bug detected in ${nameof(CompilerManager)} ${nameof(this.getModuleSource)}. ${nameof.full(this.currentCompilation)} is undefined despite waiting until done hook`);
                }
                // TODO: webpack 5 impl in progress
                const result = this.currentCompilation.getModule({identifier: () => moduleId} as Module);
                resolve(result === undefined ? undefined : result.originalSource().source.toString() || "");
                /*
                // Webpack for needs to be replaced
                for (var index = 0; index < this.currentCompilation.modules.length; ++index) {
                    const currentModule = this.currentCompilation.modules[index];
                    if (currentModule.id === moduleId) {
                        this.log.info(`Found module ${moduleId}. Keys are ${Object.keys(currentModule)}`);
                        resolve(currentModule._source === null ? "" : currentModule._source._value);
                        return;
                    }
                }
                resolve(undefined);
                */
            };
            if (this.valid) getSource();
            else this.pendingCallbacksWhichRequireStableCompilation.push(getSource);
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

    private injectWebpackHotBootstrapModifications() {
        this.compiler.hooks.compilation.tap(WEBPACK_PLUGIN_TAP_NAME, compilation => {
            // Here I am injecting raw code into the webpack bootstrap source, which comes before any module source code.
            // Reference: webpack HMR injects code into the bootstrap source: https://github.com/webpack/webpack/blob/master/lib/HotModuleReplacementPlugin.js#L337-L356
            
            // TODO: better utilize webpack 5 way of templating.

            //if (!compilation.hotUpdateChunkTemplate) {
            //    throw new Error(`Detected error. The ${nameof.full(compilation.hotUpdateChunkTemplate)} does not exist for config ${nameof(this.webpackConfigurationName)} ${this.webpackConfigurationName}`);
            //}
            
            /*
            const mainTemplate = compilation.mainTemplate;
            const bootstrapHook = mainTemplate.hooks.bootstrap;
            if (!bootstrapHook) {
                throw new Error(`Detected error. The hook ${nameof.full(compilation.mainTemplate)}.bootstrap does not exist for config ${nameof(this.webpackConfigurationName)} ${this.webpackConfigurationName}`);
            }
            bootstrapHook.tap(WEBPACK_PLUGIN_TAP_NAME, (source, chunk, hash) => {
                this.log.info(`Injecting source into chunk ${chunk.name} with hash ${hash}`);
                return injectWebpackHotBootstrapModifications(source);
            });
            */

            this.webpackConfigurationName;
            injectWebpackHotBootstrapModifications;

            /*
            compilation.hooks.afterSeal.tap(WEBPACK_PLUGIN_TAP_NAME, () => {  
                compilation.modules.forEach(module => {
                    if (module.identifier() === "webpack/runtime/hot module replacement") {
                        console.log("hmr below");
                        console.log((module as any)._source);
                    } else if (module.identifier() === "webpack/runtime/jsonp chunk loading") {
                        console.log("found jsonp chunk loading")
                    }
                })
            })
            */

            // https://github.com/webpack/webpack/blob/c00fec3aa7c79476e5b61651558f5804a48b3bac/lib/BannerPlugin.js#L77-L109
            compilation.hooks.processAssets.tap({name: WEBPACK_PLUGIN_TAP_NAME, stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS}, (assets) => {
                for (const asset in assets) {
                    
                    const currentSource = assets[asset].source();
                    if (currentSource.includes("function hotCheck")) {
                        compilation.updateAsset(asset, (currentSource) => {
                            
                        })
                    }
                }
            })
        });
    }

    private addHooks() {
        this.injectWebpackHotBootstrapModifications();
        this.compiler.hooks.invalid.tap(WEBPACK_PLUGIN_TAP_NAME, () => {
            if (!this.valid) this.log.error(`Found case where ${nameof.full(this.valid)} is ${this.valid} when ${nameof.full(this.compiler.hooks.invalid)} is tap handled`);
            this.log.info("Recompiling...");
            this.valid = false;
        });
        this.compiler.hooks.done.tap(WEBPACK_PLUGIN_TAP_NAME, async stats => {
            const {compilation} = stats;
            this.currentCompilation = compilation;
            const hash = compilation.hash;

            this.log.info("compiled");
            this.log.trace(`Webpack hash: ${ansicolor.bgWhite(ansicolor.black(hash))}`);
            const priorUpdate = this.updates[this.updates.length - 1];
            const noPriorUpdate = priorUpdate === undefined;

            // The following code mitigates a webpack bug where sometimes the hash of the module changes even though the source did not.
            const incorrectModuleUpdates: string[] = [];
            const currentSkovilleModuleMapping: Record<string, string> = {};
            const currentWebpackModuleMapping: Record<string, string> = {};
            compilation.chunks.forEach(chunk => {
                this.log.info(`Current ${nameof.full(chunk.id)}=${chunk.id}, ${nameof.full(chunk.name)}=${chunk.name}`);
                compilation.chunkGraph.getChunkModules(chunk).forEach(mod => {
                    const definitiveModuleId = mod.identifier();
                    const nonUniqueModuleId = compilation.chunkGraph.getModuleId(mod); // TODO: find a place for this.
                    nonUniqueModuleId;

                    // the original source method can return null for internal webpack modules.
                    const source = mod.originalSource()?.source().toString() ?? ""

                    const webpackHash = compilation.chunkGraph.getModuleHash(mod);
                    const skovilleHash = generateHash(source);

                    const currentModuleMonitor = this.moduleIdToModuleMonitorMap.get(definitiveModuleId);
                    if (currentModuleMonitor === undefined || webpackHash !== currentModuleMonitor.webpackHash) { // this means a module changed according to webpack
                        if (currentModuleMonitor !== undefined && currentModuleMonitor.skovilleHash === skovilleHash) { // this means a module did not change according to Skoville
                            this.log.warn(`Webpack incorrectly reported change in the module ${definitiveModuleId}`);
                            incorrectModuleUpdates.push(definitiveModuleId);
                        }
                        this.moduleIdToModuleMonitorMap.set(definitiveModuleId, {
                            source,
                            hotUpdate: undefined, // TODO: add this
                            webpackHash,
                            skovilleHash
                        });
                    }
                    currentWebpackModuleMapping[definitiveModuleId] = webpackHash;
                    currentSkovilleModuleMapping[definitiveModuleId] = skovilleHash;
                })
            })
            /*
            Webpack 4 implementation
            compilation.modules.forEach(mod => {
                const moduleId: string = (new String(mod.id)).toString();
                const moduleSource: string = mod.originalSource() === null ? "" : mod.originalSource().source.toString();
                const webpackHash: string = mod.hash;
                const moduleHotUpdate: any = (mod as any).hotUpdate;
                const skovilleHash: string = generateHash(moduleSource);
                const currentModuleMonitor = this.moduleIdToModuleMonitorMap.get(moduleId);
                if (currentModuleMonitor === undefined || webpackHash !== currentModuleMonitor.webpackHash) { // this means a module changed according to webpack
                    if (currentModuleMonitor !== undefined && currentModuleMonitor.skovilleHash === skovilleHash) { // this means a module did not change according to Skoville
                        this.log.warn(`Webpack incorrectly reported change in the module ${moduleId}`);
                        incorrectModuleUpdates.push(moduleId);
                    }
                    this.moduleIdToModuleMonitorMap.set(moduleId, {
                        source: moduleSource,
                        hotUpdate: moduleHotUpdate,
                        webpackHash,
                        skovilleHash
                    });
                }
                currentWebpackModuleMapping[moduleId] = webpackHash;
                currentSkovilleModuleMapping[moduleId] = skovilleHash;
            });
            */
            const skovilleModuleMappingJSON = JSON.stringify(currentSkovilleModuleMapping, null, 2);
            const skovilleBundleHash = generateHash(skovilleModuleMappingJSON);
            const webpackModuleMappingJSON = JSON.stringify(currentWebpackModuleMapping, null, 2);
            this.log.info(`Skoville hash: ${ansicolor.green(skovilleBundleHash)}`);

            (this.fs as any).writeFile(this.getFsPathFromRequestPath(path.join(this.publicPath, `${skovilleBundleHash}.json`)), skovilleModuleMappingJSON, () => {});
            (this.fs as any).writeFile(this.getFsPathFromRequestPath(path.join(this.publicPath, `${hash}.json`)), webpackModuleMappingJSON, () => {});

            // Now we check the actually output from Webpack's HMR plugin.
            if (noPriorUpdate || priorUpdate.hash !== hash) {
                const newUpdate: CompilerUpdate = {
                    hash,
                    errors: compilation.errors.map(webpackError => ({
                        message: webpackError.details,
                        fileName: webpackError.file,
                        sourceLocation: webpackError.loc
                    })),
                    warnings: compilation.warnings.map(webpackWarning => ({
                        message: webpackWarning.details,
                        fileName: webpackWarning.file,
                        sourceLocation: webpackWarning.loc
                    })),
                    assets: Object.keys(compilation.assets),
                    updatedModuleSources: noPriorUpdate ? {} : await this.assembleModuleUpdates(compilation, priorUpdate.hash)
                };
                Object.keys(newUpdate.updatedModuleSources)
                    .filter(updatedModuleId => incorrectModuleUpdates.includes(updatedModuleId))
                    .forEach(incorrectModuleId => {
                        this.log.warn(`Removing module id ${incorrectModuleId} from HMR update notification`);
                        delete newUpdate.updatedModuleSources[incorrectModuleId];
                    })
                this.updates.push(newUpdate);
                this.log.info("Assets");
                this.log.info(`[\n    ${newUpdate.assets.join(",\n    ")}\n]`);
                const updatedModuleIds = Object.keys(newUpdate.updatedModuleSources);
                if (updatedModuleIds.length > 0) {
                    this.log.info(`${updatedModuleIds.length} updated modules:`);
                    this.log.info(`${updatedModuleIds.map((updatedModuleId, index) => ansicolor.green(`${index + 1}) `) + updatedModuleId).join("\n")}`);
                }
                this.compilerUpdateHandler();
            }

            // Now that compilation is complete, we may handle all pending read file requests.
            this.valid = true;
            if(this.pendingCallbacksWhichRequireStableCompilation.length) {
                this.pendingCallbacksWhichRequireStableCompilation.forEach(callback => callback());
                this.pendingCallbacksWhichRequireStableCompilation = [];
            }

            // Consider doing the following after the nextTick, which is done in Webpack-Dev-Middleware
            this.logCompilationResult(stats);
        });
    }

    /**
     * @see https://github.com/webpack/webpack/blob/master/lib/HotModuleReplacementPlugin.js#L235-L300
     * @param compilation the webpack compilation.
     */
    private assembleModuleUpdates(compilation: webpack.Compilation, priorHash: string) {
        compilation;
        priorHash;
        this.executeChunkUpdateSource;
        return Promise.resolve({});
        /*
        const outputOptions = this.compiler.options.output;
        if (!outputOptions) throw new Error(`Error running ${nameof(this.assembleModuleUpdates)}. ${nameof.full(this.compiler.options.output)} is undefined`);
        const hotUpdateMainFilename = outputOptions.hotUpdateMainFilename;
        if (!hotUpdateMainFilename) throw new Error(`Error running ${nameof(this.assembleModuleUpdates)}. ${nameof(hotUpdateMainFilename)} is undefined`);
        const hotUpdateChunkFilename = outputOptions.hotUpdateChunkFilename;
        if (!hotUpdateChunkFilename) throw new Error(`Error running ${nameof(this.assembleModuleUpdates)}. ${nameof(hotUpdateChunkFilename)} is undefined`);
        return new Promise<Record<string, string>>((resolve, _reject) => {
            const updateManifestPath = compilation.getPath(hotUpdateMainFilename, {hash: priorHash});
            const updateManifestAsset = compilation.assets[updateManifestPath];
            const updateManifestSource: string = updateManifestAsset.source().toString();
            // c = chunkIds
            // r = removedChunks
            // m = removedModules
            const updateManifestContent: {h: string, c: {[chunkId: string]: true}} = JSON.parse(updateManifestSource.toString());
            const updatedModuleSources = {};
            for (const chunkId in updateManifestContent.c) {
                const chunk = Array.from(compilation.chunks.values()).find(chunk => (new String(chunk.id)).toString() === chunkId);
                const updateChunkPath = compilation.getPath(hotUpdateChunkFilename, {hash: priorHash, chunk});
                const updateChunkAsset = compilation.assets[updateChunkPath];
                const updateChunkSource = updateChunkAsset.source().toString();
                this.executeChunkUpdateSource(updateChunkSource, updatedModuleSources);
            }
            resolve(updatedModuleSources);
        });
        */
    }

    private executeChunkUpdateSource(source: string, updatedModuleSources: Record<string, string>) {
        if(isSupportedBundleTarget(this.bundleTarget)) {
            const executableSource: string = (() => {
                switch(this.bundleTarget) {
                    case 'node':
                        return `(function(hotAddUpdateChunk){\nvar exports = {};\n${source}\nhotAddUpdateChunk(exports.id, exports.modules)\n})`;
                    case 'web':
                        return `(function(webpackHotUpdate){\n${source}\n})`;
                }
            })();
            vm.runInThisContext(executableSource, {})((_chunkId: string, updatedModules: Record<string, string>) => {
                for(const moduleId in updatedModules) {
                    if (Object.prototype.hasOwnProperty.call(updatedModules, moduleId)) {
                        if (updatedModuleSources[moduleId] !== undefined) {
                            this.log.error(`The ${nameof(updatedModuleSources)} object already has a source registered for ${nameof(moduleId)} ${moduleId}`);
                        }
                        updatedModuleSources[moduleId] = updatedModules[moduleId].toString();
                    }
                }
            });
        } else {
            this.log.info(`Unsupported ${nameof(this.bundleTarget)} ${this.bundleTarget}. Source for update file below`);
            console.log(source);
            throw new Error(`Error running ${nameof(this.assembleModuleUpdates)}. Detected unsupported ${nameof(this.bundleTarget)} ${this.bundleTarget}. Open an issue or comment on a duplicate to get this target supported. Paste source for implementation reference`);
        }
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
}