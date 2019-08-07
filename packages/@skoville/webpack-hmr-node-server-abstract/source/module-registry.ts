import * as webpack from 'webpack';
import { ClientConfigurationOptions } from '@skoville/webpack-hmr-core/client/plugin-client-configuration-options';
import { v4 as generateUUID } from 'uuid';
import { AbstractServerModuleRegistry } from '@skoville/webpack-hmr-core/server/module/abstract-module-registry';
import { AbstractServerRemoteEndpointExposerModule } from '@skoville/webpack-hmr-core/server/module/abstract-server-remote-endpoint-exposer-module';
import { NodeCompilerManagerRegistryModule } from './compiler-manager-module';
import { NodeServerLoggerModule } from './logger-module';
import '@skoville/webpack-hmr-core/client/injected-client-constants/names';

export interface PluginOptions {
    client: ClientConfigurationOptions;
    server: NodeServerModuleRegistry;
}

export class NodeServerModuleRegistry extends AbstractServerModuleRegistry {
    private readonly compilerManager: NodeCompilerManagerRegistryModule;

    public constructor(serverRemoteEndpointExposer: AbstractServerRemoteEndpointExposerModule, memoryFS: boolean) {
        const compilerManager = new NodeCompilerManagerRegistryModule(memoryFS);
        super(
            compilerManager,
            new NodeServerLoggerModule(),
            serverRemoteEndpointExposer
        );
        this.compilerManager = compilerManager;
    }

    public static readonly Plugin = class Plugin implements webpack.Plugin {

        public constructor(readonly options: PluginOptions) {}

        public apply(compiler: webpack.Compiler) {

            const options = this.options;
            if (options === undefined) {
                throw new Error("Impossible state: options undefined");
            }

            const {client} = options;
            const compilerId = generateUUID();
            
            if(client.enableHotModuleReloading) {
                // If there is no HotModuleReplacement plugin, throw error.
                if (compiler.options.plugins === undefined || !compiler.options.plugins.some(plugin => plugin instanceof webpack.HotModuleReplacementPlugin)) {
                    throw new Error(`The ${nameof.full(client.enableApplicationRestarting)} option was set to true, but the webpack config does not contain an instance of ${nameof.full(webpack.HotModuleReplacementPlugin)}`);
                }
            }

            new webpack.DefinePlugin({
                [nameof(CLIENT_CONFIGURATION_OPTIONS)]: JSON.stringify(options.client),
                [nameof(COMPILER_ID)]: `'${compilerId}'`
            }).apply(compiler);

            options.server.compilerManager.register(compiler, compilerId);
        }
    }
}