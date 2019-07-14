import { Log } from "@skoville/webpack-hmr-core/shared/log";
import { AbstractSharedLoggerModule } from "@skoville/webpack-hmr-core/shared/module/abstract-logger-module";
import { ServerCommand } from '@skoville/webpack-hmr-core/server/module/command-types';

export class NodeServerLoggerModule extends AbstractSharedLoggerModule<ServerCommand.Types> {
    public constructor() {
        super();
    }
    public async handleLogEvent(request: Log.Request) {
        console.log(request.contents);
    }
}