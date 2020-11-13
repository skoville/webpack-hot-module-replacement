import * as socketio from 'socket.io-client';
import { UpdateRequest, UpdateResponse, Log } from '@skoville/webpack-hmr-shared-universal-utilities';

export class SocketIOSkovilleServerAccessor {
    private socket: typeof socketio.Socket;
    private log: Log.Logger;
    public constructor(socketIOServerURL: string, onUpdateNotification: () => Promise<void>, log: Log.Logger) {
        this.socket = socketio(socketIOServerURL, {reconnection: true});
        this.log = log.clone(`[${nameof(SocketIOSkovilleServerAccessor)}] `);
        // Handling native socket io events
        this.socket.on("connect", () => {
            this.log.info(`Connected to ${socketIOServerURL}`);
            onUpdateNotification();
        });
        this.socket.on("connecting", () => { this.log.info(`Connecting to ${socketIOServerURL}`) });
        this.socket.on("reconnecting", () => { this.log.info(`Reconnecting to ${socketIOServerURL}`) });
        this.socket.on("connect failed", () => { this.log.error(`Failed to connect to ${socketIOServerURL}`) });
        this.socket.on("reconnect failed", () => { this.log.error(`Failed to reconnect to ${socketIOServerURL}`) });
        this.socket.on("close", () => { this.log.warn(`Connection to ${socketIOServerURL} has been closed`) });
        this.socket.on("disconnect", () => { this.log.warn(`Disconnected from ${socketIOServerURL}`) });
        // Specific to Skoville
        this.socket.on("update", () => onUpdateNotification());
    }

    public async submitUpdateRequest(updateRequest: UpdateRequest): Promise<UpdateResponse> {
        return new Promise<UpdateResponse>(resolve => {
            this.socket.send(updateRequest, resolve);
        });
    }
}