import { AbstractClientModule } from "./abstract-module";
import { ClientCommand } from "./command-types";
import { compilerId, clientConfigurationOptions } from '../injected-client-constants/values';

export abstract class AbstractClientRemoteAccessorModule extends AbstractClientModule<[typeof ClientCommand.SendMessage], [typeof ClientCommand.HandleMessage]> {
    protected readonly url = clientConfigurationOptions.url;
    protected readonly compilerId = compilerId;
    protected constructor() {
        super({
            [ClientCommand.SendMessage]: message => this.sendMessage(message)
        }, "[Remote Accessor Module] ");
    }
    protected abstract async sendMessage(messageString: string): Promise<void>;
}