import { AbstractClientModule } from "./abstract-module";
import { ClientCommand } from "./command-types";
import { CLIENT_CONFIGURATION_OPTIONS, COMPILER_ID } from '../injected-client-constants';

export abstract class AbstractClientRemoteAccessorModule extends AbstractClientModule<[typeof ClientCommand.SendMessage], [typeof ClientCommand.HandleMessage]> {
    protected readonly url = CLIENT_CONFIGURATION_OPTIONS.url;
    protected readonly compilerId = COMPILER_ID;
    protected constructor() {
        super({
            [ClientCommand.SendMessage]: message => this.sendMessage(message)
        });
    }
    protected abstract async sendMessage(messageString: string): Promise<void>;
}