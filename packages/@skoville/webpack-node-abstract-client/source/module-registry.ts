import { NodeClientApplicationRestarterModule } from './application-restarter-module';
import { NodeClientLoggerModule } from './logger-module';
import { AbstractClientRemoteAccessorModule } from '@skoville/webpack/distribution/client/module/abstract-remote-accessor-module';
import { AbstractClientModuleRegistry } from '@skoville/webpack/distribution/client/module/abstract-module-registry';

//const { AbstractClientModuleRegistry } = SkovilleWebpack.Client.Module.AbstractModuleRegistry;
//const { AbstractClientRemoteAccessorModule } = SkovilleWebpack.Client.Module.AbstractRemoteAccessorModule;

export class NodeClientModuleRegistry extends AbstractClientModuleRegistry {
    public constructor(remoteAccessor: AbstractClientRemoteAccessorModule) {
        super(
            remoteAccessor,
            new NodeClientApplicationRestarterModule(),
            new NodeClientLoggerModule()
        );
    }
}