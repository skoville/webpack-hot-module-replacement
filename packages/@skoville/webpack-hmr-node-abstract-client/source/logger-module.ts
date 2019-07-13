import { Log } from '@skoville/webpack-hmr-core/shared/log';
import { SkovilleWebpack } from "@skoville/webpack";

// AbstractClientLoggerModule


;

export class NodeClientLoggerModule extends SkovilleWebpack.Shared.Module.AbstractLoggerModule.AbstractSharedLoggerModule<SkovilleWebpack.Client.Module.CommandTypes.ClientCommand.Types> {
    public constructor() {
        super();
    }
    public async handleLogEvent(request: Log.Request) {
        console.log(request.contents);
    }
}