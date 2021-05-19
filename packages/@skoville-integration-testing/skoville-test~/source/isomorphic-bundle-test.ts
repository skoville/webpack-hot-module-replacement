import * as path from 'path';
import { SkovilleWebpackPlugin, DefaultSkovilleWebpackSever } from '@skoville/webpack-hmr-server-node-default';
import * as webpack from 'webpack';
import * as fs from 'fs';
import { promisify } from 'util';

const BUNDLE_OUT_PATH = path.resolve(__dirname, "../bundle"); // This is relative to the build folder after compilation.

const skovilleServerPort = 8080;

const configs: webpack.Configuration[] = [
    /*{
        name: 'NODE-CONFIG',
        mode: 'development',
        externals: {
            // These two strange lines are necessary because of this: https://github.com/websockets/ws/issues/1220
            "utf-8-validate": "utf-8-validate",
            "bufferutil": "bufferutil"
        },
        entry: [
            path.resolve(BUNDLE_SOURCE_PATH, "./node/server.ts"),
            "@skoville/webpack-hmr-client-node-default/entry.js"
        ],
        plugins: [
            new SkovilleWebpackPlugin({
                url: `http://localhost:${skovilleServerPort}`,
                enableApplicationRestarting: true,
                enableHotModuleReloading: true
            })
        ],
        target: 'node',
        node: {
            __dirname: false,
            __filename: false
        },
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
    },*/
    {
        name: 'WEB-CONFIG',
        mode: 'development',
        entry: [
            "@skoville-integration-testing/web-sample/build/web.js",
            "@skoville/webpack-hmr-client-web-default/build/entry.js" // TODO: make inclusion of this entry automated, and change config so it's auto true and url auto-detected unless set otherwise. 
                                                                      // Maybe inject code in all entries to init rather than modifying entry array on config itself
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
        resolve: {
            extensions: ['.js']
        }
    }
];

// TODO: handle case where someone adds file into folder before complete removal.
//       Also handle case where someone puts a lock on one of the files (should probably fail immediately).
// TODO: handle symlinks
const existsAsync = promisify(fs.exists); // TODO: This is deprecated. Remove it.
async function comprehensiveDeleteAsync(deletionPath: string) {
    const exists = await existsAsync(deletionPath);
    if(exists) {
        const stats = await fs.promises.stat(deletionPath);
        if(stats.isDirectory()) {
            const children = await fs.promises.readdir(deletionPath);
            await Promise.all(children
                .map(child => path.join(deletionPath, child))
                .map(comprehensiveDeleteAsync));
            await fs.promises.rmdir(deletionPath);
        } else { // it is a file. You delete a file by unlinking it.
            await fs.promises.unlink(deletionPath);
        }
    }
}

comprehensiveDeleteAsync(BUNDLE_OUT_PATH)
    .then(() => {
        new DefaultSkovilleWebpackSever(configs, skovilleServerPort);
    });