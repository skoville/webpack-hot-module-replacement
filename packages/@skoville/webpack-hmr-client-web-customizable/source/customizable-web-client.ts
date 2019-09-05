import { SkovilleHotClientRuntime } from '@skoville/webpack-hmr-client-universal-hot-runtime';
import { Log, UpdateResponse, UpdateRequest } from '@skoville/webpack-hmr-shared-universal-utilities';
import { webpackConfigurationName, clientOptions } from '@skoville/webpack-hmr-shared-universal-utilities/distribution/injected-client-constants/values'

export class CustomizableWebClient {
    private readonly log: Log.Logger;
    private readonly hotClientRuntime: SkovilleHotClientRuntime;

    public constructor(
        loggingHandler: (logMessage: string, logLevel: Log.Level) => Promise<boolean>,
        sendRequestToServer: (updateRequest: UpdateRequest) => Promise<UpdateResponse>) {
        this.log = new Log.Logger(async logRequest => {
            const logResult = await loggingHandler(logRequest.contents, logRequest.level);
            if (logResult) {
                console.log(logRequest.contents);
            }
        })
        this.hotClientRuntime = new SkovilleHotClientRuntime(
            this.log,
            sendRequestToServer,
            async () => window.location.reload()
        );
    }

    public triggerClientUpdateRequest() {
        this.hotClientRuntime.triggerUpdateRequest();
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