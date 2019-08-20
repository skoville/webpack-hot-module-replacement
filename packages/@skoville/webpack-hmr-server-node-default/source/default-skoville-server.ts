import { CustomizableSkovilleWebpackServer } from '@skoville/webpack-hmr-server-node-customizable';
import * as webpack from 'webpack';

export class DefaultSkovilleWebpackSever {
    private readonly customizableSkovilleWebpackServer: CustomizableSkovilleWebpackServer;

    public constructor(webpackConfigurations: webpack.Configuration[]) {
        this.customizableSkovilleWebpackServer = new CustomizableSkovilleWebpackServer(
            webpackConfigurations,
            async (messageForClient, clientId) => this.sendMessageToClientHandler(messageForClient, clientId),
            async () => true,
            async (logMessage, _logLevel) => {
                console.log(logMessage);
                return true;
            }
        )
    }

    private async sendMessageToClientHandler(messageForClient: string, clientId: string): Promise<boolean> {

        return true;
    }
}