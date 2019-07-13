import { AbstractModule } from "@isomorphic-typescript/modularly-architected-library-foundation";

import { SharedCommand } from '../../shared/module/command-types';
import { AbstractSharedLoggerModule } from "../../shared/module/abstract-logger-module";

import { AbstractServerRemoteEndpointExposerModule } from './abstract-server-remote-endpoint-exposer-module';
import { ServerCommand } from "./command-types";
import { AbstractCompilerManagerModule } from './abstract-compiler-manager-module';

export abstract class AbstractServerModuleRegistry extends AbstractModule.Registry<ServerCommand.Types> {
    protected constructor(
        compilerManager: AbstractCompilerManagerModule,
        logger: AbstractSharedLoggerModule<ServerCommand.Types>,
        serverBoundary: AbstractServerRemoteEndpointExposerModule
    ) {
        super({
            [ServerCommand.CompilerNotification]: serverBoundary,
            [ServerCommand.GetLastCompilerUpdateNotification]: compilerManager,
            [ServerCommand.ReadFile]: compilerManager,
            [SharedCommand.Log]: logger
        });
    }
}