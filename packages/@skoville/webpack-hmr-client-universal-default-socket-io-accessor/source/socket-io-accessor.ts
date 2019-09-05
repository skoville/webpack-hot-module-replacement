import * as socketio from 'socket.io-client';
import { UpdateRequest, UpdateResponse } from '@skoville/webpack-hmr-shared-universal-utilities'

export class SocketIOSkovilleServerAccessor {
    private socket: typeof socketio.Socket;
    public constructor(private readonly socketIOServerURL: string, onUpdateNotification: () => Promise<void>) {
        this.socket = socketio(this.socketIOServerURL);
        this.socket.on("update", () => onUpdateNotification());
    }

    public async submitUpdateRequest(updateRequest: UpdateRequest): Promise<UpdateResponse> {
        return new Promise((resolve, reject) => {
            this.socket.send(updateRequest, (error: Error | undefined, updateResponse: string) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(JSON.parse(updateResponse));
                }
            });
        });
    }
}