import { NodeClientModuleRegistry } from '@skoville/webpack-hmr-node-client-abstract';
import { SocketIOClientRemoteAccessorModule } from '@skoville/webpack-hmr-universal-client-socketio-remote-accessor-module';

new NodeClientModuleRegistry(new SocketIOClientRemoteAccessorModule());