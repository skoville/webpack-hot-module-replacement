import { DefaultNodeServer, SkovilleWebpackPlugin } from '@skoville/webpack-hmr-node-server-default';

const skovillePlugin = new SkovilleWebpackPlugin({
    client: {
        url: "https://localhost:8080",
        enableApplicationRestarting: true,
        enableHotModuleReloading: true
    },
    server: new DefaultNodeServer(true, 8080)
});

skovillePlugin;