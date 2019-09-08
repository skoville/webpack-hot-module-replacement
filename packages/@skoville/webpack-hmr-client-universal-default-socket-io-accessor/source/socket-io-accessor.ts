import * as socketio from 'socket.io-client';
import { UpdateRequest, UpdateResponse } from '@skoville/webpack-hmr-shared-universal-utilities';

export class SocketIOSkovilleServerAccessor {
    private socket: typeof socketio.Socket;
    public constructor(socketIOServerURL: string, onUpdateNotification: () => Promise<void>) {
        this.socket = socketio(socketIOServerURL);
        this.socket.on("update", () => onUpdateNotification());
    }

    public async submitUpdateRequest(updateRequest: UpdateRequest): Promise<UpdateResponse> {
        return new Promise<UpdateResponse>(resolve => {
            this.socket.send(updateRequest, resolve);
        });
    }
}