import { AbstractClientModule } from "./abstract-module";
import { ClientCommand } from "./command-types";
export abstract class AbstractClientApplicationRestarterModule extends AbstractClientModule<[typeof ClientCommand.RestartApplication], []> {
    protected constructor(logPrefix?: string) {
        super({
            [ClientCommand.RestartApplication]: () => this.restartApplication()
        }, logPrefix || "[Application Restarter] ");
    }
    protected abstract async restartApplication(): Promise<void>;
}