import * as express from 'express';
import * as mime from 'mime';
import * as http from 'http';
import * as socketio from 'socket.io';
import * as ansicolor from 'ansicolor';
import { CompilerNotification } from '@skoville/webpack-hmr-core/shared/server-client-notification-model';
import { TOOL_NAME } from '@skoville/webpack-hmr-core/shared/tool-name';
import { AbstractServerRemoteEndpointExposerModule } from '@skoville/webpack-hmr-node-server-abstract';
import { CompilerNotificationPayload, ServerCommand } from '@skoville/webpack-hmr-core/server/module/command-types';
import { NodeFileStream } from '@skoville/webpack-hmr-node-server-abstract/source/file-stream';
import { COMPILER_ID } from '@skoville/webpack-hmr-core/client/injected-client-constants';

export class DefaultNodeServerBoundaryModule extends AbstractServerRemoteEndpointExposerModule {
    private readonly httpServer: http.Server;
    private readonly ioServer: socketio.Server;
    private readonly compilerIdToSocketSetMap: Map<string, Set<socketio.Socket>>;

    public constructor(port: number) {
        super();
        this.compilerIdToSocketSetMap = new Map();
        const expressApp = express();
        this.setUpGETRequestHandling(expressApp);
        this.httpServer = new http.Server(expressApp);
        this.ioServer = socketio(this.httpServer);
        this.setUpWebSocketHandling(this.ioServer);
        this.httpServer.listen(port, () => {
            console.log("working");
            this.log.info(`Listening on port ${port}.`);
        });
    }

    private setUpGETRequestHandling(app: express.Express) {
        app.get("*", async (req, res, next) => {
            this.log.info("get request incoming");
            try {
                const path = req.path === '/' ? '/index.html' : req.path;
                const mimeType = mime.getType(path);
                if (mimeType == null) {
                    throw new Error(`unable to resolve mime type for resource at '${req.path}'`);
                }
                res.setHeader("Content-Type", mimeType);

                // Ideally we would be able to get the bundle id from the header of the get request, but we don't really have control over the get
                // requests being sent by webpack hot module replacement plugin. Therefore, the bottom code doesn't work.
                // TODO: find a way either to modify webpack's HMR behavior or to replace the plugin entirely so we can add the bundle id to the 
                // header of GET requests made to the header. Also add bundle id to header of GET requests of node HMR client, but this is easier
                // since we are currently controlling this portion.
                /**
                const compilerId = req.header(nameof(COMPILER_ID));
                if (compilerId === undefined) {
                    throw new Error(`Request is missing '${nameof(COMPILER_ID)}' header. Cannot complete request`);
                }
                console.log(`NEW GET REQUEST. ${nameof(compilerId)} = ${compilerId}`);
                const compilerManager = CompilerManagerRegistry.getCompilerManager(compilerId);
                const stream = await compilerManager.getReadStream(path);
                if(stream === false) {
                    throw new Error(`The compiler manager does not have any file stored at path '${req.path}'`);
                }
                */

                // For now we have to do it this way.
                const fileStream = await this.excuteCommand(ServerCommand.ReadFile, {path});
                await NodeFileStream.pipe(fileStream, res);
                this.log.info(ansicolor.magenta("File successfully piped to requestor"));
            } catch(e) {
                this.log.error("ERROR");
                this.log.error(e.message);
            }
            return next();
        });
    }

    private setUpWebSocketHandling(io: socketio.Server) {
        const { compilerIdToSocketSetMap } = this;
        io.on('connection', async socket => {
            const compilerId: string = socket.handshake.query[nameof(COMPILER_ID)];
            console.log(`NEW CONNECTION. ${nameof(compilerId)} = ${compilerId}`);
            
            const associatedSocketSet = compilerIdToSocketSetMap.get(compilerId) || new Set();
            compilerIdToSocketSetMap.set(compilerId, associatedSocketSet);

            associatedSocketSet.add(socket);

            const lastCompilerUpdate = await this.excuteCommand(ServerCommand.GetLastCompilerUpdateNotification, compilerId);
            if (lastCompilerUpdate !== undefined) {
                this.sendNotification(socket, lastCompilerUpdate);
            }

            socket.on("disconnect", () => {
                associatedSocketSet.delete(socket);
                socket.disconnect(true); // Do we need to do this within a disconnect handler?
            });
        });
    }

    public close(cb: Function) {
        Array.from(this.compilerIdToSocketSetMap.values())
            .forEach(socketSet => {
                Array.from(socketSet.values())
                    .forEach(socket => {
                        socket.disconnect(true);
                    });
                socketSet.clear();
            });
        this.compilerIdToSocketSetMap.clear();
        this.ioServer.close(() => {
            this.httpServer.close(() => {
                cb();
            });
        })
    }

    protected async handleCompilerNotification({notification, compilerId}: CompilerNotificationPayload) {
        const socketSet = this.compilerIdToSocketSetMap.get(compilerId);
        if (socketSet !== undefined) {
            Array.from(socketSet.values())
                .forEach(socket => this.sendNotification(socket, notification));
        }
    }

    private sendNotification(socket: socketio.Socket, notification: CompilerNotification.Body) {
        // TODO: I wrote the below comment a while ago regarding the same line but in a different context. See if it is still needed.
        // Will want to end up using the socket.io emitted boolean to tell what clients are up to date and which are behind.
        this.ioServer.to(socket.id).emit(TOOL_NAME, JSON.stringify(notification));
    }
}