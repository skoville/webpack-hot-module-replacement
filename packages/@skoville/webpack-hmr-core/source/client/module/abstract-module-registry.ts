import { AbstractClientRemoteAccessorModule } from "./abstract-remote-accessor-module";
import { AbstractClientApplicationRestarterModule } from "./abstract-application-restarter-module";
import { WebpackRuntimeModule } from "./webpack-runtime-module";
import { ClientCommand } from "./command-types";
import { AbstractModule } from '@isomorphic-typescript/modularly-architected-library-foundation';
import { SharedCommand } from "../../shared/module/command-types";
import { AbstractSharedLoggerModule } from '../../shared/module/abstract-logger-module';

export abstract class AbstractClientModuleRegistry extends AbstractModule.Registry<ClientCommand.Types> {
    protected constructor(
        remoteAccessor: AbstractClientRemoteAccessorModule,
        applicationRestarter: AbstractClientApplicationRestarterModule,
        logger: AbstractSharedLoggerModule<ClientCommand.Types>,
    ) {
        super({
            [ClientCommand.RestartApplication]: applicationRestarter,
            [ClientCommand.HandleMessage]: new WebpackRuntimeModule(),
            [ClientCommand.SendMessage]: remoteAccessor,
            [SharedCommand.Log]: logger
        });
    }
}