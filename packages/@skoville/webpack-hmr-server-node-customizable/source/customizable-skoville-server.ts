import * as webpack from 'webpack';
import { Log, UpdateRequest, UpdateResponse } from '@skoville/webpack-hmr-shared-universal-utilities';
import { v4 as generateUUID } from 'uuid';
import { CompilerManager } from './compiler-manager';
import * as fs from 'fs';

export type SkovilleWebpackEvent = "ClientPinged";
export class CustomizableSkovilleWebpackServer {
    private readonly webpackConfigurationNameToCompilerManagerMap: Map<string, CompilerManager>;
    private readonly log: Log.Logger;

    public constructor(
        webpackConfigurations: webpack.Configuration[],
        compilerUpdatedHandler: (webpackConfigurationName: string) => Promise<void>,
        eventObserver: (skovilleWebpackEvent: SkovilleWebpackEvent, logger: Log.Logger) => Promise<void>,
        loggingHandler: (logMessage: string, logLevel: Log.Level) => Promise<boolean>) {

        // Initialize logger
        this.log = new Log.Logger(async logRequest => {
            const logResult = await loggingHandler(logRequest.contents, logRequest.level);
            if (logResult) {
                console.log(logRequest.contents);
            }
        });

        // TODO: start actually using event observer.
        eventObserver("ClientPinged", this.log);

        // Initialize mappings
        this.webpackConfigurationNameToCompilerManagerMap = new Map();

        // Populate mappings & validate configurations
        const seenWebpackConfigurationNames = new Set<string>();
        webpackConfigurations
            .map(webpackConfiguration => {
                const name = webpackConfiguration.name;
                if (name === undefined) {
                    throw new Error(`All ${nameof(webpackConfiguration)}s supplied to ${nameof(CustomizableSkovilleWebpackServer)} must have a '${nameof(name)}' configuration argument set.`);
                }
                if (seenWebpackConfigurationNames.has(name)) {
                    throw new Error(`No two ${nameof(webpackConfiguration)}s may have the same '${nameof(name)}' argument.`);
                }
                return {name, webpackConfiguration};
            })
            .forEach(({name, webpackConfiguration}) => {
                const compilerManager = new CompilerManager(
                    webpack(webpackConfiguration),
                    () => { compilerUpdatedHandler(name); },
                    true /* TODO: actually obtain the memoryFS option */,
                    this.log,
                    name
                );
                this.webpackConfigurationNameToCompilerManagerMap.set(name, compilerManager);
            });
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

    public getFileStream(filePath: string, webpackConfigurationName: string): Promise<fs.ReadStream|false> {
        const compilerManager = this.getCompilerManagerFromConfigurationName(webpackConfigurationName, `Unable to ${
            nameof(this.getFileStream)} at ${nameof(filePath)} '${filePath}' for ${webpackConfigurationName} '${webpackConfigurationName}'`);
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