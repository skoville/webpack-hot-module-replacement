import { Log } from '@skoville/webpack-hmr-core/shared/log';
import { AbstractSharedLoggerModule } from "@skoville/webpack-hmr-core/shared/module/abstract-logger-module";
import { ClientCommand } from '@skoville/webpack-hmr-core/client/module/command-types';
import ansicolor from 'ansicolor';

export class WebClientLoggerModule extends AbstractSharedLoggerModule<ClientCommand.Types> {
    public constructor() {
        super();
    }

    public async handleLogEvent(request: Log.Request) {
        console.log(...ansicolor.parse(request.contents).asChromeConsoleLogArguments);
    }
}