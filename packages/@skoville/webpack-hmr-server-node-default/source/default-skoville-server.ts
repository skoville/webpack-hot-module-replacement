import { CustomizableSkovilleWebpackServer, Log, UpdateRequest, UpdateResponse, generateHash } from '@skoville/webpack-hmr-server-node-customizable';
import * as webpack from 'webpack';
import * as http from 'http';
import * as socketio from 'socket.io';
import * as express from 'express';
import * as mime from 'mime';
import * as ansicolor from 'ansicolor';
console.log("require('express-graphql')");
import * as createGraphqlMiddleware from 'express-graphql';
console.log("required express-graphql");
console.log("require('graphql')");
import { assertSchema } from 'graphql';
console.log("required graphql");
const configNameExpressPathParameter = "webpackConfigurationName";
const moduleIdExpressPathParameter = "moduleId";
const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;

export class DefaultSkovilleWebpackSever {
    private readonly customizableSkovilleWebpackServer: CustomizableSkovilleWebpackServer;
    private readonly log: Log.Logger;
    private readonly httpServer: http.Server;
    private readonly socketioServer: socketio.Server;
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
            async () => {}
        );
        this.log = this.customizableSkovilleWebpackServer.getLogger().clone(`[${ansicolor.cyan(nameof(DefaultSkovilleWebpackSever))}] `);
        
        this.webpackConfigurationNameToSocketsMap = new Map();

        const expressApp = express();
        this.setUpGETRequestHandling(expressApp);
        this.httpServer = new http.Server(expressApp);
        this.socketioServer = socketio(this.httpServer);
        this.setUpWebSocketHandling(this.socketioServer);
        this.httpServer.listen(port, () => {
            this.log.info(`Listening on port ${port}.`);
        });
    }

    private setUpGETRequestHandling(app: express.Express) {
        this.log.info("the schema is " + this.customizableSkovilleWebpackServer.getGraphqlSchema());
        this.log.info("the type of the schema is " + typeof(this.customizableSkovilleWebpackServer.getGraphqlSchema()));
        this.log.info("asserting is a schema");
        assertSchema(this.customizableSkovilleWebpackServer.getGraphqlSchema());
        app.use('/graphql', createGraphqlMiddleware({
            schema: this.customizableSkovilleWebpackServer.getGraphqlSchema(),
            graphiql: true
        }));
        app.get(`/:${configNameExpressPathParameter}/*`, async (req, res, _next) => {
            try {
                this.log.info("get request incoming");
                const path = req.path; // TODO: support for index.html
                const mimeType = mime.getType(path) || "text/plain";
                res.setHeader("Content-Type", mimeType);

                this.log.info("Headers below");
                this.log.info(JSON.stringify(req.headers));
                this.log.info("Body below");
                this.log.info(req.body || "undefined");

                // For now we have to do it this way.
                this.log.info("path is " + req.path);
                const fileStream = await this.customizableSkovilleWebpackServer.getFileStream(path, req.params[configNameExpressPathParameter]);
                if (fileStream !== false) {
                    res.status(HTTP_OK_STATUS);
                    fileStream.pipe(res);
                } else {
                    res.sendStatus(HTTP_NOT_FOUND_STATUS);
                }
            } catch(e) {
                this.log.error(e.message);
                res.setHeader("Content-Type", "text/plain");
                res.status(HTTP_NOT_FOUND_STATUS);
                res.send(e.message);
            }
        });
        app.get(`/:${configNameExpressPathParameter}`, async (req, res, _next) => {
            try {
                const webpackConfigurationName = req.params[configNameExpressPathParameter];
                const moduleId = req.query[moduleIdExpressPathParameter];
                console.log(`fetching source for module ${moduleId}`);
                if (moduleId === "" || moduleId === null || moduleId === undefined) {
                    res.status(400);
                    throw new Error(`${nameof(moduleId)} parameter is ${moduleId}, which is invalid`);
                } else {
                    const moduleSource = await this.customizableSkovilleWebpackServer.getModuleSource(moduleId, webpackConfigurationName);
                    if (moduleSource === undefined) {
                        res.status(HTTP_NOT_FOUND_STATUS);
                        res.send({error: `moduleId ${moduleId} does not exist in config ${webpackConfigurationName}`});
                    } else {
                        res.status(HTTP_OK_STATUS);
                        this.log.info(generateHash(moduleSource));
                        console.log(moduleSource);
                        res.send(moduleSource);
                    }
                }
            } catch(e) {
                this.log.error(e.message);
            }
        });
    }

    private setUpWebSocketHandling(io: socketio.Server) {
        io.on('connection', async socket => {
            this.log.info("New connection");
            socket.on("message", (updateRequest: UpdateRequest, acknowledge: (response: UpdateResponse) => void) => {
                this.log.info(`Request for config ${updateRequest.webpackConfigurationName}: ${updateRequest.currentHash}`);
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
                    console.log(Object.keys(response.updatesToApply[1].updatedModuleSources));
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

    public async close() {
        Array.from(this.webpackConfigurationNameToSocketsMap.values())
            .forEach(sockets => {
                sockets.forEach(socket => socket.disconnect(true));
            });
        this.webpackConfigurationNameToSocketsMap.clear();
        return new Promise<void>(resolve => {
            this.socketioServer.close(() => {
                this.httpServer.close(() => {
                    resolve();
                });
            })
        });
    }
}