import { CustomizableSkovilleWebpackServer, Log, UpdateRequest, UpdateResponse, generateHash } from '@skoville/webpack-hmr-server-node-customizable';
import * as webpack from 'webpack';
import * as http from 'http';
import * as socketio from 'socket.io';
import fastify, { FastifyInstance } from 'fastify';
import * as mime from 'mime';
import * as ansicolor from 'ansicolor';
import * as url from 'url';
import * as fs from 'fs';
import * as path from 'path';
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

        var fastifyHandler: http.RequestListener = () => {};
        this.httpServer = new http.Server((req, res) => {
            fastifyHandler(req, res);
        });

        const fastifyApp = fastify({serverFactory: handler => {
            fastifyHandler = handler;
            return this.httpServer;
        }});

        this.setUpGETRequestHandling(fastifyApp);
        
        this.socketioServer = new socketio.Server();
        this.socketioServer.attach(this.httpServer, {
            cors: {
                origin: "*", // TODO: make this a list of urls which were passed? Maybe not because then it seems file:// would be blocked. Look into this more.
                methods: ["GET", "POST"]
            }
        });
        this.setUpWebSocketHandling(this.socketioServer);
        /*
        this.httpServer.listen(port, () => {
            this.log.info(`Listening on port ${port}.`);
        });
        */
       fastifyApp.listen(port, () => {
           this.log.info(`Fastify listening on port ${port}`);
       });
    }

    private setUpGETRequestHandling(app: FastifyInstance) {
        app.get('/favicon.ico', async (_req, reply) => {
            const readStream = fs.createReadStream(path.resolve(__dirname, '../assets/skoville.ico'));
            const finishedFuture = new Promise(resolve => readStream.on('end', () => { resolve() }));
            readStream.pipe(reply.raw);
            await finishedFuture;
            await reply.code(HTTP_OK_STATUS).send();
        });
        app.get(`/:${configNameExpressPathParameter}/*`, async (req, reply) => {
            try {
                this.log.info("get request incoming");
                const path = url.parse(req.url).path ?? ""; // TODO: support for index.html
                const mimeType = mime.getType(path) || "text/plain";
                reply.header("Content-Type", mimeType);

                this.log.info("Headers below");
                this.log.info(JSON.stringify(req.headers));
                this.log.info("Body below");
                this.log.info(req.body as string || "undefined");

                // For now we have to do it this way.
                this.log.info("path is " + path);
                const fileStream = await this.customizableSkovilleWebpackServer.getFileStream(path, (req.params as any)[configNameExpressPathParameter]);
                if (fileStream !== false) {
                    reply.status(HTTP_OK_STATUS);
                    const finishedFuture = new Promise(resolve => fileStream.on('end', () => { resolve() }));
                    fileStream.pipe(reply.raw);
                    await finishedFuture;
                } else {
                    reply.status(HTTP_NOT_FOUND_STATUS);
                }
                await reply.send();
            } catch(e) {
                this.log.error(e.message);
                reply.header("Content-Type", "text/plain");
                reply.status(HTTP_NOT_FOUND_STATUS);
                reply.send(e.message);
            }
        });
        app.get(`/`, async (_req, res) => {
            this.log.info('homepage request');
            const configs = this.customizableSkovilleWebpackServer.getAvailableConfigurationNames();
            await res.type('text/html').send(`<!DOCTYPE html>
            <html>
                <head>
                    <title>Skoville</title>
                </head>
                <body>
                    <h1>Skoville Default Server</h1>
                    <div>
                        <b>available configurations are:</b>
                        <br />
                        <ul>
                        ${ configs.map(config => `<li><a href="/${config}">${config}</li>`).join("") }
                        </ul>
                </body>
            </html>`);
        });
        app.get(`/:${configNameExpressPathParameter}`, async (req, res) => {
            try {
                const webpackConfigurationName = (req.params as any)[configNameExpressPathParameter];
                const moduleId: string = (req.query as any)[moduleIdExpressPathParameter] as string;
                this.log.info(`fetching source for module ${ansicolor.cyan(moduleId)} in config ${ansicolor.magenta(webpackConfigurationName)}`);
                if (moduleId === "" || moduleId === null || moduleId === undefined) {
                    this.log.info(`config page request for config ${webpackConfigurationName}`);
                    await res.type('text/html').send(`<!DOCTYPE html>
                    <html>
                        <head>
                            <title>Skoville | ${ webpackConfigurationName }</title>
                        </head>
                        <body>
                            <div>
                                <b>Current hash</b>:
                                <br/>
                                hash here
                                <br/>
                                <b>Chunks</b>:
                                <br/>
                                Link to chunk bundle file at top then underneath table of assets.
                            </div>
                        </body>
                    </html>`);
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
                await res.type('text/html').send(`<!DOCTYPE html>
                <html>

                    <body>

                    </body>
                </html>`);
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