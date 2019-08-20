import * as webpack from 'webpack';
import '@skoville/webpack-hmr-shared-universal-utilities/distribution/injected-client-constants/names';
import { SkovilleWebpackPluginOptions } from '@skoville/webpack-hmr-shared-universal-utilities';

export class SkovilleWebpackPlugin implements webpack.Plugin {

    public constructor(private readonly options: SkovilleWebpackPluginOptions) {}

    public apply(compiler: webpack.Compiler) {

        const {enableHotModuleReloading} = this.options;

        if (compiler.options.plugins !== undefined && compiler.options.plugins.some(plugin => plugin instanceof webpack.HotModuleReplacementPlugin)) {
            throw new Error(`You must allow the ${nameof(SkovilleWebpackPlugin)} to insert an instance of ${
                nameof.full(webpack.HotModuleReplacementPlugin)} into the configuration options plugins array for you. You may not add an instance of this plugin yourself.`);
        }
        
        if(enableHotModuleReloading) {
            new webpack.HotModuleReplacementPlugin({}).apply(compiler);
        }

        new webpack.DefinePlugin({
            [nameof(CLIENT_OPTIONS)]: JSON.stringify(this.options),
            [nameof(WEBPACK_CONFIGURATION_NAME)]: `'${compiler.options.name}'`
        }).apply(compiler);
    }
}