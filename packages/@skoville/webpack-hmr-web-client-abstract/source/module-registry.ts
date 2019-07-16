import { AbstractClientModuleRegistry } from '@skoville/webpack-hmr-core/client/module/abstract-module-registry';
import { WebClientApplicationRestarterModule } from "./application-restarter-module";
import { WebClientLoggerModule } from './logger-module';
import { AbstractClientRemoteAccessorModule } from '@skoville/webpack-hmr-core/client/module/abstract-remote-accessor-module';

export class WebClientModuleRegistry extends AbstractClientModuleRegistry {
    public constructor(remoteAccessor: AbstractClientRemoteAccessorModule) {
        super(
            remoteAccessor,
            new WebClientApplicationRestarterModule(),
            new WebClientLoggerModule());
    }
}