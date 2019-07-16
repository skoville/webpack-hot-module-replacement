import { NodeServerModuleRegistry } from '@skoville/webpack-hmr-node-server-abstract';
import { DefaultNodeServerBoundaryModule } from './socketio-server-remote-endpoint-exposer-module';

export class Plugin extends NodeServerModuleRegistry.Plugin {
}

export class DefaultNodeServer extends NodeServerModuleRegistry {
    public constructor(memoryFS: boolean, port: number) {
        super(new DefaultNodeServerBoundaryModule(port), memoryFS);
    }
}