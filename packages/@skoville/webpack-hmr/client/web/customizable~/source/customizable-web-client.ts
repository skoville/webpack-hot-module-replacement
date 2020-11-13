import { SkovilleHotClientRuntime } from '@skoville/webpack-hmr-client-universal-hot-runtime';
import { Log, UpdateResponse, UpdateRequest } from '@skoville/webpack-hmr-shared-universal-utilities';
import { webpackConfigurationName, clientOptions } from '@skoville/webpack-hmr-shared-universal-utilities/build/injected-client-constants/values';
import * as ansicolor from 'ansicolor';

export class CustomizableWebClient {
    private readonly log: Log.Logger;
    private readonly hotClientRuntime: SkovilleHotClientRuntime;

    public constructor(
        loggingHandler: (logMessage: string, logLevel: Log.Level) => Promise<boolean>,
        sendRequestToServer: (updateRequest: UpdateRequest) => Promise<UpdateResponse>) {
        this.log = new Log.Logger(async logRequest => {
            const logResult = await loggingHandler(logRequest.contents, logRequest.level);
            if (logResult) {
                console.log(...ansicolor.parse(logRequest.contents).asChromeConsoleLogArguments);
            }
        }, `Skoville${nameof(CustomizableWebClient)}`);
        this.hotClientRuntime = new SkovilleHotClientRuntime(
            this.log,
            sendRequestToServer,
            async () => window.location.reload()
        );
    }

    public async triggerClientUpdateRequest() {
        await this.log.info("about to trigger update request from customizable to hot runtime");
        await this.hotClientRuntime.triggerUpdateRequest();
    }

    public getLogger() {
        return this.log;
    }

    public static getWebpackConfigurationName() {
        return webpackConfigurationName;
    }

    public static getServerURL() {
        return clientOptions.url;
    }
}