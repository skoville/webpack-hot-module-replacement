/**
 * webpack-hmr-client-web-customizable
 * webpack-hmr-client-web-default
 * webpack-hmr-client-web-default-logging-handler
 * wepback-hmr-server-node-customizable
 * webpack-hmr-server-node-default
 * webpack-hmr-server-node-default-event-observer
 * webpack-hmr-shared-node-default-logging-handler
 * webpack-hmr-shared-universal-code
 */

//import * as webpack from require('webpack');



type SkovilleWebpackEvent = "event-1" | "event-2";

class CustomizableSkovilleWebpackServer {
    public constructor(
        private readonly webpackConfigurations: any, //webpack.Config[],
        private readonly sendMessageToClientHandler: (messageForClient: string, clientId: string) => Promise<boolean>,
        private readonly loggingHandler: (logMessage: string) => Promise<boolean>,
        private readonly eventObserver: (skovilleWebpackEvent: SkovilleWebpackEvent, logger: Log.Logger) => Promise<boolean>) {
    }

    public registerClient(applicationName: string) {
        applicationName;

        this.webpackConfigurations;
        this.sendMessageToClientHandler;
        this.loggingHandler;
        this.eventObserver;
    }

    public unregisterClient(clientId: string) {
        clientId;
    }

    public async processClientMessage(messageFromClient: string, clientId: string): Promise<void> {
        const thing: any = JSON.parse(messageFromClient);
        thing;
        clientId;
    }

    public getFileStream(filePath: string, clientId: string) {
        filePath;
        clientId;
    }
}

class SkovilleWebpackPlugin {

}

new SkovilleWebpackPlugin();
new CustomizableSkovilleWebpackServer([], async () => true, async () => false, async () => true);