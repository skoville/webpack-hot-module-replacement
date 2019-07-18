import { CustomizableNodeServerModuleRegistry } from '@skoville/webpack-hmr-node-server-abstract';
import { DefaultNodeServerBoundaryModule } from './socketio-server-remote-endpoint-exposer-module';
export { SkovilleWebpackPlugin, SkovilleWebpackPluginOptions } from '@skoville/webpack-hmr-node-server-abstract';

export class DefaultNodeServer extends CustomizableNodeServerModuleRegistry {
    public constructor(memoryFS: boolean, port: number) {
        super(new DefaultNodeServerBoundaryModule(port), memoryFS);
    }
}