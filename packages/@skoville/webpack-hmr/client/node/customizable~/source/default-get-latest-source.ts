import * as http from 'http';
import * as https from 'https';
import { clientOptions } from '@skoville/webpack-hmr-shared-universal-utilities/build/injected-client-constants/values';
import { URL } from 'url';
import { Log } from '@skoville/webpack-hmr-shared-universal-utilities';
import { Readable } from 'stream';
import * as path from 'path';

// TODO: 1. stop making assumption that the __filename is the same filename as downloaded from url
//       2. support multiple chunked file outputs.

export async function defaultGetLatestSource(log: Log.Logger) {
    const urlString = clientOptions.url;
    const url = new URL(urlString);
    const client = (url.protocol === 'https' ? https : http);
    // Instead figure out the entry point or chunk which needs to be reloaded & downloaded.
    const bundleURL = `${urlString}${__webpack_public_path__}${path.basename(__filename)}`;
    log.info(`Downloading latest source from ${bundleURL}`);
    const response = await new Promise<http.IncomingMessage>(resolve => {
        client.get(bundleURL, resolve);
    });
    const sourceStream = new Readable();
    response.on('data', chunk => {
        sourceStream.push(chunk);
    });
    response.on('end', () => {
        sourceStream.push(null);
    });
    sourceStream._read = () => {};
    return sourceStream;
}