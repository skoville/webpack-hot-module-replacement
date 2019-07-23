import * as path from 'path';
import { DefaultNodeServer, SkovilleWebpackPlugin } from '@skoville/webpack-hmr-node-server-default';
import * as webpack from 'webpack';
import { fsAsync } from '@isomorphic-typescript/fs-async-nodejs';

const projectPackageJSON = require('../package.json');
projectPackageJSON;

const skovillePlugin = new SkovilleWebpackPlugin({
    client: {
        url: "https://localhost:8080",
        enableApplicationRestarting: true,
        enableHotModuleReloading: true
    },
    server: new DefaultNodeServer(true, 8080)
});

const PROJECT_PATH = path.resolve(__dirname, "../");
const BUNDLE_SOURCE_PATH = path.resolve(PROJECT_PATH, "source-bundle");
const BUNDLE_OUT_PATH = path.resolve(__dirname, "./bundles"); // This is relative to the dist folder after compilation.

const configs: webpack.Configuration[] = [
    {
        mode: 'development',
        entry: path.resolve(BUNDLE_SOURCE_PATH, "./node/server.ts"),
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            skovillePlugin
        ],
        target: 'node',
        output: {
            path: BUNDLE_OUT_PATH,
            filename: 'server.js'
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            //configFile: path.resolve(PROJECT_PATH, "./tsconfig.json")
                        }
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.ts']
        }
    },
    // TODO: add entry for web bundle.
];

fsAsync.comprehensiveDeleteAsync(BUNDLE_OUT_PATH)
    .then(() => {
        webpack(configs).watch({}, async (error: Error, stats: webpack.Stats) => {
            error;
            stats;
            console.log("run output");
        });
    });