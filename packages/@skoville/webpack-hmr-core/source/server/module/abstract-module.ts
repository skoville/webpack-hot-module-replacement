import { AbstractSharedModuleWithEmbeddedLogging } from '../../shared/module/abstract-module-with-embedded-logging';
import { ServerCommand } from "./command-types";

export abstract class AbstractServerModule<HandledCommands extends (keyof ServerCommand.Types)[], IssuableCommands extends (keyof ServerCommand.Types)[]>
    extends AbstractSharedModuleWithEmbeddedLogging<ServerCommand.Types, HandledCommands, IssuableCommands> {}