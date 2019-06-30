import { AbstractModule, CommandTypes, CommandExecutorImplementations } from '@isomorphic-typescript/modularly-architected-library-foundation';
import { Log } from "../log";
import { SharedCommand } from "./command-types";

export abstract class AbstractSharedModuleWithEmbeddedLogging<
    T extends CommandTypes<T> & SharedCommand.Types,
    HandledCommands extends (keyof T)[],
    IssuableCommands extends (keyof T)[]>
extends AbstractModule<T, HandledCommands, IssuableCommands> {
    protected readonly log: Log.Logger;
    protected constructor(executors: CommandExecutorImplementations<T & SharedCommand.Types, HandledCommands>, logPrefix?: string) {
        super(executors);
        this.log = new Log.Logger(
            logRequest => this.excuteCommand(SharedCommand.Log, logRequest), 
            logPrefix
        );
    }
}