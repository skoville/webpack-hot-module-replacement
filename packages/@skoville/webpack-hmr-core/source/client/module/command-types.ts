import { CompilerNotification } from "../../shared/server-client-notification-model";
import { SharedCommand } from "../../shared/module/command-types";

export namespace ClientCommand {
    // Define all possible events.
    export const RestartApplication = Symbol("restart application");
    export const HandleMessage = Symbol("handle message");
    export const SendMessage = Symbol("send message");
    // Map each possible event to a corresponding event payload.
    // An event payload is the data required to handle an event.
    export interface Types extends SharedCommand.Types {
        [RestartApplication]: [void, void];
        [HandleMessage]: [CompilerNotification.Body, void];
        [SendMessage]: [string, void];
    }
}