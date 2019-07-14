import { Log } from '@skoville/webpack-hmr-core/shared/log';
import { AbstractSharedLoggerModule } from "@skoville/webpack-hmr-core/shared/module/abstract-logger-module";
import { ClientCommand } from '@skoville/webpack-hmr-core/client/module/command-types';

export class NodeClientLoggerModule extends AbstractSharedLoggerModule<ClientCommand.Types> {
    public constructor() {
        super();
    }
    public async handleLogEvent(request: Log.Request) {
        console.log(request.contents);
    }
}