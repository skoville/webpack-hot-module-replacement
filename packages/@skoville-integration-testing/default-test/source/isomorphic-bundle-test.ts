import * as path from 'path';
import { SkovilleWebpackPlugin, DefaultSkovilleWebpackSever } from '@skoville/webpack-hmr-server-node-default';
import * as webpack from 'webpack';
import { fsAsync } from '@isomorphic-typescript/fs-async-nodejs';

//const projectPackageJSON = require('../package.json');

const PROJECT_PATH = path.resolve(__dirname, "../");
const BUNDLE_SOURCE_PATH = path.resolve(PROJECT_PATH, "source-bundle");
const BUNDLE_OUT_PATH = path.resolve(__dirname, "./bundles"); // This is relative to the dist folder after compilation.

//const dependencies = new Set([...Object.keys(projectPackageJSON.dependencies), ...Object.keys(projectPackageJSON.devDependencies)]);

const skovilleServerPort = 8080;

const configs: webpack.Configuration[] = [
    /*
    {
        mode: 'development',
        externals: {
            // These two strange lines are necessary because of this: https://github.com/websockets/ws/issues/1220
            "utf-8-validate": "utf-8-validate",
            "bufferutil": "bufferutil"
        },
        entry: [
            path.resolve(BUNDLE_SOURCE_PATH, "./node/server.ts"),
            "@skoville/webpack-hmr-node-client-default/entry.js"
        ],
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
                            configFile: path.resolve(BUNDLE_SOURCE_PATH, "./node/tsconfig.json"),
                            onlyCompileBundledFiles: true
                        }
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js']
        }
    },
    */
    // TODO: add entry for web bundle.
    {
        name: 'WEB-CONFIG',
        mode: 'development',
        entry: [
            path.resolve(BUNDLE_SOURCE_PATH, "./web/web.ts"),
            "@skoville/webpack-hmr-client-web-default/entry.js"
        ],
        plugins: [
            new SkovilleWebpackPlugin({
                url: `http://localhost:${skovilleServerPort}`,
                enableApplicationRestarting: true,
                enableHotModuleReloading: true
            })
        ],
        target: 'web',
        output: {
            path: BUNDLE_OUT_PATH,
            filename: 'web.js'
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(BUNDLE_SOURCE_PATH, './web/tsconfig.json'),
                            onlyCompileBundledFiles: true
                        }
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        }
    }
];

new DefaultSkovilleWebpackSever(configs, skovilleServerPort);

fsAsync.comprehensiveDeleteAsync(BUNDLE_OUT_PATH)
    .then(() => {
        webpack(configs).watch({}, async (error: Error, stats: webpack.Stats) => {
            error;
            stats;
            console.log("run output");
        });
    });