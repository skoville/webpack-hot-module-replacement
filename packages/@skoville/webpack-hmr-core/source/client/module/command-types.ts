import { CompilerNotification } from "../../shared/server-client-notification-model";
import { SharedCommand } from "../../shared/module/command-types";
import { v4 as generateUUID } from 'uuid';

export namespace ClientCommand {
    // Define all possible events.
    export const RestartApplication = Symbol("restart application " + generateUUID());
    export const HandleMessage = Symbol("handle message " + generateUUID());
    export const SendMessage = Symbol("send message " + generateUUID());
    // Map each possible event to a corresponding event payload.
    // An event payload is the data required to handle an event.
    export interface Types extends SharedCommand.Types {
        [RestartApplication]: [void, void];
        [HandleMessage]: [CompilerNotification.Body, void];
        [SendMessage]: [string, void];
    }
}