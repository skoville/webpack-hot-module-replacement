import { AbstractSharedModuleWithEmbeddedLogging } from '../../shared/module/abstract-module-with-embedded-logging';
import { ClientCommand } from './command-types';

export abstract class AbstractClientModule<HandledCommands extends (keyof ClientCommand.Types)[], IssuableCommands extends (keyof ClientCommand.Types)[]>
    extends AbstractSharedModuleWithEmbeddedLogging<ClientCommand.Types, HandledCommands, IssuableCommands> {}