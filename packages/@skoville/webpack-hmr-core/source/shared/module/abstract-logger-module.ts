import { AbstractSharedModuleWithEmbeddedLogging } from "./abstract-module-with-embedded-logging";
import { Log } from "../log";
import { CommandTypes } from "@isomorphic-typescript/modularly-architected-library-foundation";
import { SharedCommand } from './command-types';
export abstract class AbstractSharedLoggerModule<T extends CommandTypes<T> & SharedCommand.Types> 
    extends AbstractSharedModuleWithEmbeddedLogging<T, [typeof SharedCommand.Log], []> {
    protected constructor() {
        super({
            [SharedCommand.Log]: request => this.handleLogEvent(request)
        });
    }
    protected abstract async handleLogEvent(request: Log.Request): Promise<void>;
}