import * as webpack from 'webpack';
import { Log, UpdateRequest, UpdateResponse } from '@skoville/webpack-hmr-shared-universal-utilities';
import { v4 as generateUUID } from 'uuid';
import { CompilerManager } from './webpack-plugin/compiler-manager';
import * as fs from 'fs';
import ansicolor = require('ansicolor');

export type SkovilleWebpackEvent = "ClientPinged";
export class CustomizableSkovilleWebpackServer {
    private readonly webpackConfigurationNameToCompilerManagerMap: Map<string, CompilerManager>;
    private readonly log: Log.Logger;

    public constructor(
        webpackConfigurations: webpack.Configuration[],
        compilerUpdatedHandler: (webpackConfigurationName: string) => Promise<void>,
        eventObserver: (skovilleWebpackEvent: SkovilleWebpackEvent, logger: Log.Logger) => Promise<void>) {

        // Initialize logger
        this.log = new Log.Logger(async logRequest => {
            console.log(logRequest.contents);
        }, `[${ansicolor.cyan(nameof(CustomizableSkovilleWebpackServer))}]`, `[${process.pid}]`);

        // TODO: start actually using event observer.
        eventObserver("ClientPinged", this.log);

        // Initialize mappings
        this.webpackConfigurationNameToCompilerManagerMap = new Map();

        // Populate mappings & validate configurations
        const seenWebpackConfigurationNames = new Set<string>();
        webpackConfigurations
            .forEach(webpackConfiguration => {
                const name = webpackConfiguration.name;
                if (name === undefined) {
                    throw new Error(`All ${nameof(webpackConfiguration)}s supplied to ${nameof(CustomizableSkovilleWebpackServer)} must have a '${nameof(name)}' configuration argument set.`);
                }
                if (seenWebpackConfigurationNames.has(name)) {
                    throw new Error(`No two ${nameof(webpackConfiguration)}s may have the same '${nameof(name)}' argument.`);
                }
                seenWebpackConfigurationNames.add(name);
                const mandatoryPublicPathPrefix = `/${name}/`;
                if (webpackConfiguration.output === undefined) {
                    webpackConfiguration.output = { publicPath: mandatoryPublicPathPrefix };
                } else {
                    const publicPath = webpackConfiguration.output.publicPath;
                    if (publicPath === undefined) {
                        webpackConfiguration.output.publicPath = mandatoryPublicPathPrefix;
                    } else if (typeof publicPath !== 'string') {
                        throw new Error(`The typeof ${nameof.full(webpackConfiguration.output.publicPath)} was ${typeof publicPath} instead of the expected string`);
                    } else {
                        if (!publicPath.startsWith(mandatoryPublicPathPrefix)) {
                            throw new Error(`The ${nameof.full(webpackConfiguration.output.publicPath)} for a ${nameof(webpackConfiguration)} with a ${nameof(name)} of '${name}' must have a ${nameof.full(webpackConfiguration.output.publicPath)} which begins with '${mandatoryPublicPathPrefix}'.`);
                        }
                    }
                }
            });
        const multiCompiler = webpack(webpackConfigurations);
        multiCompiler.compilers
            .forEach(webpackCompiler => {
                const name = webpackCompiler.options.name;
                if (name === undefined) {
                    throw Error(`Logical error internal to implementation of ${nameof(CustomizableSkovilleWebpackServer)} detected. Name of webpack compiler is undefined after initialization of ${nameof(multiCompiler)}`);
                }
                const compilerManager = new CompilerManager(
                    webpackCompiler,
                    () => { compilerUpdatedHandler(name); },
                    false /* TODO: actually obtain the memoryFS option */,
                    this.log,
                    name
                );
                this.webpackConfigurationNameToCompilerManagerMap.set(name, compilerManager);
            });
        multiCompiler.watch({}, () => {}); // TODO: do we want any options input here?
    }

    public getAvailableConfigurationNames(): string[] {
        return Array.from(this.webpackConfigurationNameToCompilerManagerMap.keys());
    }

    public handleClientMessage(updateRequest: UpdateRequest): UpdateResponse {
        const compilerManager = this.webpackConfigurationNameToCompilerManagerMap.get(updateRequest.webpackConfigurationName);
        if (compilerManager === undefined) {
            return { webpackConfigurationNameRegistered: false };
        }
        const clientId = updateRequest.clientId || generateUUID();
        const updates = compilerManager.getUpdates();
        for (const index in updates) {
            const update = updates[index];
            if (update.hash === updateRequest.currentHash) {
                return {
                    webpackConfigurationNameRegistered: true,
                    compatible: true,
                    clientId,
                    updatesToApply: updates.slice(parseInt(index))
                };
            }
        }
        return {
            webpackConfigurationNameRegistered: true,
            compatible: false,
            clientId
        };
    }

    public getModuleSource(moduleId: string, webpackConfigurationName: string): Promise<string | undefined> {
        const compilerManager = this.getCompilerManagerFromConfigurationName(webpackConfigurationName, `Unable to ${
            nameof(this.getModuleSource)} of ${nameof(moduleId)} '${moduleId}' from ${nameof(webpackConfigurationName)} '${webpackConfigurationName}'`);
        return compilerManager.getModuleSource(moduleId);
    }

    public getFileStream(filePath: string, webpackConfigurationName: string): Promise<fs.ReadStream|false> {
        const compilerManager = this.getCompilerManagerFromConfigurationName(webpackConfigurationName, `Unable to ${
            nameof(this.getFileStream)} at ${nameof(filePath)} '${filePath}' for ${nameof(webpackConfigurationName)} '${webpackConfigurationName}'`);
        return compilerManager.getReadStream(filePath);
    }

    public getLogger() {
        return this.log;
    }

    private getCompilerManagerFromConfigurationName(webpackConfigurationName: string, errorPrefix: string) {
        const clientsAndCompilerManager = this.webpackConfigurationNameToCompilerManagerMap.get(webpackConfigurationName);
        if (clientsAndCompilerManager === undefined) {
            throw new Error(`${errorPrefix}The ${nameof(webpackConfigurationName)} '${webpackConfigurationName}' is not registered.\n`);
        }
        return clientsAndCompilerManager;
    }
}