import { DefaultNodeServer, SkovilleWebpackPlugin } from '@skoville/webpack-hmr-node-server-default';
import * as webpack from 'webpack';

const skovillePlugin = new SkovilleWebpackPlugin({
    client: {
        url: "https://localhost:8080",
        enableApplicationRestarting: true,
        enableHotModuleReloading: true
    },
    server: new DefaultNodeServer(true, 8080)
});

const configs: webpack.Configuration[] = [
    {
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            skovillePlugin
        ]
    },
];

webpack(configs).watch({}, async (error: Error, stats: webpack.Stats) => {
    error;
    stats;
    console.log("run output");
});