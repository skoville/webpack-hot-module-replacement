import { AbstractClientRemoteAccessorModule } from '@skoville/webpack-hmr-core/client/module/abstract-remote-accessor-module';
import { ClientCommand } from '@skoville/webpack-hmr-core/client/module/command-types';
import { TOOL_NAME } from '@skoville/webpack-hmr-core/shared/tool-name';
import * as socketio from 'socket.io-client';
import '@skoville/webpack-hmr-core/client/injected-client-constants/names';

export class SocketIOClientRemoteAccessorModule extends AbstractClientRemoteAccessorModule {
    private socket: typeof socketio.Socket;
    
    public constructor() {
        super();
        this.log.trace("hello world -> " + nameof(COMPILER_ID));
        this.log.trace(`url = ${this.url}`);
        this.socket = socketio(`${this.url}?${nameof(COMPILER_ID)}=${this.compilerId}`);
        this.socket.on(TOOL_NAME, (messageString: string) => {
            this.log.info("received message");
            this.log.info(messageString);
            this.excuteCommand(ClientCommand.HandleMessage, JSON.parse(messageString));
        });
        // TODO: refactor.
        const socketioErrors = ['connect_error', 'connect_timeout', 'error', 'disconnect', 'reconnect_error', 'reconnect_failed'];
        socketioErrors.forEach(error => {
            this.socket.on(error, (...args: any[]) => {
                this.log.error("connection error: " + error + ", arguments: " + args);
            })
        });
    }

    public async sendMessage(messageString: string) {
        this.socket.emit(TOOL_NAME, messageString);
    }
}