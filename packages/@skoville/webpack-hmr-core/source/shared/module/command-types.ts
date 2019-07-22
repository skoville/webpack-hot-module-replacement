import { Log } from "../log";
import { v4 as generateUUID } from 'uuid';

export namespace SharedCommand {
    export const Log = Symbol("log message " + generateUUID()); // Having a UUID in the Symbol name could help with bugs related to multiple symbols later on.
    export interface Types {
        [Log]: [Log.Request, void];
    }
} 