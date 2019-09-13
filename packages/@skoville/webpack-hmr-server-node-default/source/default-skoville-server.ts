import { CustomizableSkovilleWebpackServer, Log, UpdateRequest, UpdateResponse } from '@skoville/webpack-hmr-server-node-customizable';
import * as webpack from 'webpack';
import * as http from 'http';
import * as socketio from 'socket.io';
import * as express from 'express';
import * as mime from 'mime';

export class DefaultSkovilleWebpackSever {
    private readonly customizableSkovilleWebpackServer: CustomizableSkovilleWebpackServer;
    private readonly log: Log.Logger;
    private readonly httpServer: http.Server;
    private readonly ioServer: socketio.Server;
    private readonly webpackConfigurationNameToSocketsMap: Map<string, Set<socketio.Socket>>;

    public constructor(webpackConfigurations: webpack.Configuration[], port: number) {
        this.customizableSkovilleWebpackServer = new CustomizableSkovilleWebpackServer(
            webpackConfigurations,
            async (webpackConfigurationName: string) => {
                const sockets = this.webpackConfigurationNameToSocketsMap.get(webpackConfigurationName);
                if (sockets === undefined) {
                    this.webpackConfigurationNameToSocketsMap.set(webpackConfigurationName, new Set());
                } else {
                    sockets.forEach(socket => socket.emit("update"));
                }
            },
            async () => {},
            async () => true,
        );
        this.log = this.customizableSkovilleWebpackServer.getLogger();
        
        this.webpackConfigurationNameToSocketsMap = new Map();

        const expressApp = express();
        this.setUpGETRequestHandling(expressApp);
        this.httpServer = new http.Server(expressApp);
        this.ioServer = socketio(this.httpServer);
        this.setUpWebSocketHandling(this.ioServer);
        this.httpServer.listen(port, () => {
            this.log.info(`Listening on port ${port}.`);
        });
    }

    private setUpGETRequestHandling(app: express.Express) {
        const configNameExpressPathParameter = "webpackConfigurationName";
        app.get(`/:${configNameExpressPathParameter}/*`, async (req, res, next) => {
            this.log.info("get request incoming");
            try {
                const path = req.path; // TODO: support for index.html
                const mimeType = mime.getType(path);
                if (mimeType == null) {
                    throw new Error(`unable to resolve mime type for resource at '${req.path}'`);
                }
                res.setHeader("Content-Type", mimeType);

                this.log.info("Headers below");
                this.log.info(JSON.stringify(req.headers));
                this.log.info("Body below");
                this.log.info(req.body);

                // For now we have to do it this way.
                this.log.info("path is " + req.path);
                const fileStream = await this.customizableSkovilleWebpackServer.getFileStream(path, req.params[configNameExpressPathParameter]);
                if (fileStream !== false) {
                    const HTTP_OK_STATUS = 200;
                    res.status(HTTP_OK_STATUS);
                    fileStream.pipe(res);
                } else {
                    const HTTP_NOT_FOUND_STATUS = 404;
                    res.status(HTTP_NOT_FOUND_STATUS);
                }
            } catch(e) {
                this.log.error(e.message);
            }
            return next();
        });
    }

    private setUpWebSocketHandling(io: socketio.Server) {
        io.on('connection', async socket => {
            socket.on("message", (updateRequest: UpdateRequest, acknowledge: (response: UpdateResponse) => void) => {
                console.log("request:");
                console.log(updateRequest);
                const response = this.customizableSkovilleWebpackServer.handleClientMessage(updateRequest);
                if (response.webpackConfigurationNameRegistered === true) {
                    const sockets = this.webpackConfigurationNameToSocketsMap.get(updateRequest.webpackConfigurationName) || new Set();
                    if (!sockets.has(socket)) {
                        sockets.add(socket);
                    }
                    this.webpackConfigurationNameToSocketsMap.set(updateRequest.webpackConfigurationName, sockets);
                }
                console.log("response:");
                console.log(response);
                if (response.webpackConfigurationNameRegistered && response.compatible && response.updatesToApply.length > 1) {
                    console.log("sent updates:");
                    console.log(response.updatesToApply[1].updatedModuleSources);
                }
                acknowledge(response);
            });
            socket.on("disconnect", () => {
                Array.from(this.webpackConfigurationNameToSocketsMap.values())
                    .forEach(sockets => {
                        if (sockets.has(socket)) {
                            sockets.delete(socket);
                        }
                    })
                socket.disconnect(true); // Do we need to do this within a disconnect handler?
            });
        });
    }

    public close(cb: Function) {
        Array.from(this.webpackConfigurationNameToSocketsMap.values())
            .forEach(sockets => {
                sockets.forEach(socket => socket.disconnect(true));
            });
        this.webpackConfigurationNameToSocketsMap.clear();
        this.ioServer.close(() => {
            this.httpServer.close(() => {
                cb();
            });
        })
    }
}