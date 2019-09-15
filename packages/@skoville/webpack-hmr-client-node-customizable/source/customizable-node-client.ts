import { SkovilleHotClientRuntime } from '@skoville/webpack-hmr-client-universal-hot-runtime';
import { Log, UpdateRequest, UpdateResponse } from '@skoville/webpack-hmr-shared-universal-utilities';
import { webpackConfigurationName, clientOptions } from '@skoville/webpack-hmr-shared-universal-utilities/distribution/injected-client-constants/values';

var restartingProgram = false;

export class CustomizableNodeClient {
    private readonly log: Log.Logger;
    private readonly hotClientRuntime: SkovilleHotClientRuntime;

    public constructor(
        loggingHandler: (logMessage: string, logLevel: Log.Level) => Promise<boolean>,
        sendRequestToServer: (updateRequest: UpdateRequest) => Promise<UpdateResponse>,
        _getLatestSource: () => Promise<string>) {
        this.log = new Log.Logger(async logRequest => {
            const logResult = await loggingHandler(logRequest.contents, logRequest.level);
            if (logResult) {
                console.log(logRequest.contents);
            }
        }, `Skoville${nameof(CustomizableNodeClient)}`);
        this.log.info(`PID = ${process.pid}`);
        this.hotClientRuntime = new SkovilleHotClientRuntime(
            this.log,
            sendRequestToServer,
            // TODO: should we instead allow users to pass in their own implementation of download?
            // Perhaps they don't want to use a direct GET.
            async () => {
                // Step 1. Download latest source
                // const source = await getLatestSource();
                console.log("module below");
                console.log(module);
                // Step 2. replace the current source with the downloaded source

                // Step 4. Set a temporary file which will act as a way to see if there was a client id.

                // Step 3. Restart the current process.
                await this.log.info("Restarting in detached process...");
                if (restartingProgram) return;
                restartingProgram = true;
                setTimeout(() => {
                    process.on("exit", function () {
                        require("child_process").spawn(process.argv.shift(), [...process.execArgv, ...process.argv], {
                            cwd: process.cwd(),
                            detached : true,
                            stdio: "inherit"
                        })
                    });
                    process.exit();
                }, 20);
            }
        )
    }

    public async triggerClientUpdateRequest() {
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