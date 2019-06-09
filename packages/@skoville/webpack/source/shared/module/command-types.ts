import { Log } from "../log";

export namespace SharedCommand {
    export const Log = Symbol("log message");
    export interface Types {
        [Log]: [Log.Request, void];
    }
} 