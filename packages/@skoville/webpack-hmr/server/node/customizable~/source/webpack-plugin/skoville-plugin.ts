import * as webpack from 'webpack';
import '@skoville/webpack-hmr-shared-universal-utilities/build/injected-client-constants/names';
import { SkovilleWebpackPluginOptions } from '@skoville/webpack-hmr-shared-universal-utilities';



export class SkovilleWebpackPlugin implements webpack.WebpackPluginInstance {

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

        // See https://github.com/MichalLytek/type-graphql/blob/20c81f4f7ee82779595002d25784fce3a8ff8b9b/src/browser-shim.ts#L7-L12
        // TODO: better typing. Cummon webpack!
        new webpack.NormalModuleReplacementPlugin(/type-graphql$/, (resource: any) => {
            resource.request = resource.request.replace(/type-graphql/, "type-graphql/dist/browser-shim");
        }).apply(compiler);
    }

    public getCompilerManager() {

    }

    public getClientManager() {
        
    }
}