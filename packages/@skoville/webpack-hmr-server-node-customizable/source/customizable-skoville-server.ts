/**
 * webpack-hmr-client-web-customizable
 * webpack-hmr-client-web-default
 * webpack-hmr-client-web-default-logging-handler
 * wepback-hmr-server-node-customizable
 * webpack-hmr-server-node-default
 * webpack-hmr-server-node-default-event-observer
 * webpack-hmr-shared-node-default-logging-handler
 * webpack-hmr-shared-universal-utilities
 */
import * as webpack from 'webpack';
import { Log } from '@skoville/webpack-hmr-shared-universal-utilities';
import { v4 as generateUUID } from 'uuid';
import { CompilerManager } from './compiler-manager';
import * as fs from 'fs';

export type SkovilleWebpackEvent = "event-1" | "event-2";
export class CustomizableSkovilleWebpackServer {
    private readonly registeredClientIdToWebpackConfigurationNameMap: Map<string, string>;
    private readonly webpackConfigurationNameToRegisteredClientIdsMapAndCompilerManager: Map<string, {clients: Set<string>, compilerManager: CompilerManager}>;
    private readonly log: Log.Logger;

    public constructor(
        webpackConfigurations: webpack.Configuration[],
        private readonly sendMessageToClientHandler: (messageForClient: string, clientId: string) => Promise<boolean>,
        eventObserver: (skovilleWebpackEvent: SkovilleWebpackEvent, logger: Log.Logger) => Promise<boolean>,
        loggingHandler: (logMessage: string, logLevel: Log.Level) => Promise<boolean>) {

        // Initialize logger
        this.log = new Log.Logger(async logRequest => {
            const logResult = await loggingHandler(logRequest.contents, logRequest.level);
            if (logResult) {
                console.log(logRequest.contents);
            }
        });

        // TODO: start actually using event observer.
        eventObserver("event-1", this.log);

        // Initialize mappings
        this.registeredClientIdToWebpackConfigurationNameMap = new Map();
        this.webpackConfigurationNameToRegisteredClientIdsMapAndCompilerManager = new Map();

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
                const clients = new Set<string>();
                const compilerManager = new CompilerManager(webpack(webpackConfiguration), compilerNotification => {
                    clients.forEach(clientId => {
                        sendMessageToClientHandler(JSON.stringify(compilerNotification), clientId);
                    });
                }, true, this.log); // TODO: take in memory fs option.
                this.webpackConfigurationNameToRegisteredClientIdsMapAndCompilerManager.set(name, {clients, compilerManager});
            });
    }

    public registerClient(webpackConfigurationName: string) {
        const {clients, compilerManager} = this.getClientsAndCompilerManagerFromConfigurationName(webpackConfigurationName, `Unable to ${nameof(this.registerClient)}. `);
        
        var clientId: string;
        do {
            clientId = generateUUID();
        } while(!clients.has(clientId));
        clients.add(clientId);

        setTimeout(() => {
            this.sendMessageToClientHandler(JSON.stringify(compilerManager.getLatestUpdateNotification()), clientId);
        }, 0);
        this.registeredClientIdToWebpackConfigurationNameMap.set(clientId, webpackConfigurationName);
        return clientId;
    }

    public isClientRegistered(clientId: string) {
        return this.registeredClientIdToWebpackConfigurationNameMap.has(clientId);
    }

    public unregisterClient(clientId: string) {
        const { clients } = this.getClientsAndCompilerManagerFromClientId(clientId, nameof(this.unregisterClient));
        this.registeredClientIdToWebpackConfigurationNameMap.delete(clientId);
        clients.delete(clientId);
    }

    public async processClientMessage(messageFromClient: string, clientId: string): Promise<void> {
        // TODO: implement.
        const thing: any = JSON.parse(messageFromClient);
        thing;
        clientId;
    }

    public getFileStream(filePath: string, clientId: string): Promise<fs.ReadStream|false> {
        const { compilerManager } = this.getClientsAndCompilerManagerFromClientId(clientId, `${nameof(this.getFileStream)} at ${nameof(filePath)} '${filePath}'`);
        return compilerManager.getReadStream(filePath);
    }

    private getClientsAndCompilerManagerFromClientId(clientId: string, attemptedMethod: string) {
        const errorPrefix = `Unable to ${attemptedMethod} for ${nameof(clientId)} '${clientId}'.\n`;
        const webpackConfigurationName = this.registeredClientIdToWebpackConfigurationNameMap.get(clientId);
        if (webpackConfigurationName === undefined) {
            throw new Error(`${errorPrefix}The ${nameof(clientId)} is not registered.\n`);
        }
        return this.getClientsAndCompilerManagerFromConfigurationName(webpackConfigurationName, `${errorPrefix}${
            nameof(clientId)} '${clientId}' maps to ${nameof(webpackConfigurationName)} '${webpackConfigurationName}\n`);
    }

    private getClientsAndCompilerManagerFromConfigurationName(webpackConfigurationName: string, errorPrefix: string) {
        const clientsAndCompilerManager = this.webpackConfigurationNameToRegisteredClientIdsMapAndCompilerManager.get(webpackConfigurationName);
        if (clientsAndCompilerManager === undefined) {
            throw new Error(`${errorPrefix}The ${nameof(webpackConfigurationName)} '${webpackConfigurationName}' is not registered.\n`);
        }
        return clientsAndCompilerManager;
    }
}