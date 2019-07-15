import { NodeClientModuleRegistry } from '@skoville/webpack-hmr-node-abstract-client';
import { SocketIOClientRemoteAccessorModule } from '@skoville/webpack-hmr-universal-socketio-client-remote-accessor-module';

export class DefaultNodeClient extends NodeClientModuleRegistry {
    public constructor() {
        super(new SocketIOClientRemoteAccessorModule());
    }
}