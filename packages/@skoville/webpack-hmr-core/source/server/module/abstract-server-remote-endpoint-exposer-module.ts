import { AbstractServerModule } from "./abstract-module";
import { ServerCommand, CompilerNotificationPayload } from "./command-types";

export abstract class AbstractServerRemoteEndpointExposerModule extends AbstractServerModule<[typeof ServerCommand.CompilerNotification], [typeof ServerCommand.ReadFile, typeof ServerCommand.GetLastCompilerUpdateNotification]> {
    protected constructor(logPrefix?: string) {
        super({
            [ServerCommand.CompilerNotification]: notificationPayload => this.handleCompilerNotification(notificationPayload)
        }, logPrefix || "[Remote Endpoint Exposer] ");
    }
    protected abstract async handleCompilerNotification(notificationPayload: CompilerNotificationPayload): Promise<void>
}