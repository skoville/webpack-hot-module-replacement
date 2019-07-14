import { Log } from "@universal/shared/log";
import { AbstractServerLoggerModule } from "@universal/server/module/abstract/logger-module";

export class NodeServerLoggerModule extends AbstractServerLoggerModule {
    public constructor() {
        super();
    }
    public async handleLogEvent(request: Log.Request) {
        console.log(request.contents);
    }
}