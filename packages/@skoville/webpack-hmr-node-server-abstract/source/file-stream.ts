import * as fs from 'fs';
import { AbstractFileStream } from "@skoville/webpack-hmr-core/server/abstract-file-stream";

export class NodeFileStream extends AbstractFileStream {
    public constructor(readStream: fs.ReadStream) {
        super();
        readStream.on('data', chunk => {
            this.writeNextChunk(chunk);
        });
        readStream.on('end', () => {
            this.finish();
        });
        readStream.on('error', (err) =>{
            console.log("read stream error");
            console.log(err);
        });
    }

    public static async pipe(fileStream: AbstractFileStream, destination: NodeJS.WritableStream) {
        const chunk = await fileStream.getNextChunk();
        if (chunk !== undefined) {
            return new Promise<void>(resolve => {
                destination.write(chunk, async () => {
                    await this.pipe(fileStream, destination);
                    resolve();
                });
            })
        } else {
            destination.end();
        }
    }
}