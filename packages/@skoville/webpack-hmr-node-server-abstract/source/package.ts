import { NodeServerModuleRegistry, PluginOptions } from './module-registry';
export { AbstractServerRemoteEndpointExposerModule } from '@skoville/webpack-hmr-core/server/module/abstract-server-remote-endpoint-exposer-module';

export { NodeFileStream } from './file-stream';
export { CompilerNotificationPayload, ServerCommand } from '@skoville/webpack-hmr-core/server/module/command-types';
export type SkovilleWebpackPluginOptions = PluginOptions;

export class CustomizableNodeServerModuleRegistry extends NodeServerModuleRegistry {}
export class SkovilleWebpackPlugin extends NodeServerModuleRegistry.Plugin {}