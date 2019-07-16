import { WebClientModuleRegistry } from '@skoville/webpack-hmr-web-client-abstract';
import { SocketIOClientRemoteAccessorModule } from '@skoville/webpack-hmr-universal-client-socketio-remote-accessor-module';

new WebClientModuleRegistry(new SocketIOClientRemoteAccessorModule());