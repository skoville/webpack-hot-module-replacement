import { NodeClientApplicationRestarterModule } from './application-restarter-module';
import { NodeClientLoggerModule } from './logger-module';
import { AbstractClientRemoteAccessorModule } from '@skoville/webpack-hmr-core/client/module/abstract-remote-accessor-module';
import { AbstractClientModuleRegistry } from '@skoville/webpack-hmr-core/client/module/abstract-module-registry';

export class NodeClientModuleRegistry extends AbstractClientModuleRegistry {
    public constructor(remoteAccessor: AbstractClientRemoteAccessorModule) {
        super(
            remoteAccessor,
            new NodeClientApplicationRestarterModule(),
            new NodeClientLoggerModule()
        );
    }
}