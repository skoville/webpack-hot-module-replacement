import * as cp from 'child_process';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as path from 'path';
import * as url from 'url';

import { BundleRunnerToClientMessage, BundleRunnerToClientMessageType, ClientToBundleRunnerMessage, ClientToBundleRunnerMessageType } 
    from '@skoville/webpack-hmr-node-client-application-restarter-module-data-transfer-object';
import { TOOL_NAME } from '@skoville/webpack-hmr-core/shared/tool-name';
import { log } from './logger';
import { fsAsync } from '@isomorphic-typescript/fs-async-nodejs';

// TODO: develop integ tests for Code Splitting, Lazy Loading, etc.

/**
 * Runs a node.js webpack bundle.
 */
export class NodeBundleRunner {
    protected readonly filePath: string;
    private shouldRestart: boolean = false;

    /**
     * Creates a new instance of a NodeBundleRunner which runs a bundle file which is already stored locally.
     * 
     * @param bundleEntryFilePath A path to the entry of the node.js bundle.
     * 
     * @throws Error when the path does not reference existing file.
     */
    public static async createInstance(bundleEntryFilePath: string) {
        const STANDARD_VALIDATION_ERROR_MESSAGE = `'${bundleEntryFilePath}' is not a valid file path.`;
        if(!bundleEntryFilePath) throw new Error(STANDARD_VALIDATION_ERROR_MESSAGE);
        const filePath = path.resolve(bundleEntryFilePath);
        const fileStats = await fsAsync.statAsync(filePath);
        if(!fileStats.isFile()) throw new Error(STANDARD_VALIDATION_ERROR_MESSAGE);
        return new this(filePath);
    }

    protected get dirPath() {
        return path.dirname(this.filePath);
    }

    protected constructor(filePath: string) {
        this.filePath = filePath;
    }

    public async run() {
        const bundleProcess = cp.fork(this.filePath);
        bundleProcess
            .on("message", (message: ClientToBundleRunnerMessage) => {
                // TODO: here we need to validate if the incoming message really is a ProcessCommunicationMessage.
                this.handleMessage(message, bundleProcess);
            })
            .on("error", err => {
                throw err;
            })
            .on("exit", code => {
                log.trace("\nBundle process exited with code " + code + "\nBundle file = '" + this.filePath + "'.");
                if(this.shouldRestart) {
                    log.warn("Restarting...\n");
                    this.shouldRestart = false;
                    this.run();
                } else {
                    log.error("Exiting.\n");
                    process.exit();
                }
            });
    }

    protected async handleMessage(message: ClientToBundleRunnerMessage, bundleProcess: cp.ChildProcess) {
        console.log("parent handleMessage");
        switch(message.type) {
            case ClientToBundleRunnerMessageType.Restart:
                // The application runtime is responsible for killing itself.
                // However this message gives us a way to know when to
                // restart the application versus kill this master process.
                this.shouldRestart = true;
                break;
            case ClientToBundleRunnerMessageType.UpdateRequest:
                const response: BundleRunnerToClientMessage = {
                    type: BundleRunnerToClientMessageType.UpdateResponse,
                    data: {
                        sequenceNumber: message.data.sequenceNumber
                    }
                };
                bundleProcess.send(response);
                break;
            default:
                throw new Error(`Unrecognizable message '${JSON.stringify(message)}'.`);
        }
    }

}

export class DownloadingNodeBundleRunner extends NodeBundleRunner {
    private static readonly DEFAULT_BUNDLE_ENTRY_FILENAME = "initial-entry.js";
    private static readonly BUNDLE_STORAGE_PATH = path.resolve(`./.${TOOL_NAME.toLowerCase()}`);
    private readonly url: url.URL;

    public constructor(bundleEntryFileURL: string) {
        const { BUNDLE_STORAGE_PATH, DEFAULT_BUNDLE_ENTRY_FILENAME } = DownloadingNodeBundleRunner;
        const parsedURL = new url.URL(bundleEntryFileURL);
        const filename = path.basename(parsedURL.pathname) || DEFAULT_BUNDLE_ENTRY_FILENAME;
        super(path.join(BUNDLE_STORAGE_PATH, filename));
        this.url = parsedURL;
    }

    public async run() {
        await this.resetBundleSpace();
        await super.run();
    }

    private async resetBundleSpace() {
        const {BUNDLE_STORAGE_PATH} = DownloadingNodeBundleRunner;
        await this.recursiveRemoval(BUNDLE_STORAGE_PATH);
        await fsAsync.mkdirAsync(BUNDLE_STORAGE_PATH, {recursive: true});
        await this.download(this.url, this.filePath);
    }

    /**
     * Downloads a file to from a url, and saves the contents into a file at a specified path.
     * 
     * @param url The url to download.
     * @param savepath The path where the contents of the download should be stored.
     * 
     * @throws Error when the url does not use the 'http' or 'https' protocol
     * @throws Error if any error occurs during download or save.
     */
    private async download(url: url.URL, savepath: string) {
        const HTTP_PROTOCOL = "http:";
        const HTTPS_PROTOCOL = "https:";
        const client = (
            url.protocol === HTTP_PROTOCOL ? http :
            url.protocol === HTTPS_PROTOCOL ? https :
            undefined
        );
        if(client === undefined) {
            throw new Error(`Unsupported protocol '${this.url.protocol}'. Use either '${HTTP_PROTOCOL}' or '${HTTPS_PROTOCOL}'`);
        }
        const result = await new Promise<void|Error>(resolve => {
            client
                .get(url, res => {
                    const writeStream = fs.createWriteStream(savepath);
                    writeStream.on("finish", () => {resolve();});
                    res.pipe(writeStream);
                })
                .on('error', async err => {
                    if(await fsAsync.existsAsync(savepath)) {
                        await fsAsync.unlinkAsync(savepath);
                    }
                    resolve(err);
                });
        });
        if(result instanceof Error) {
            throw result;
        }
    }

    protected async handleMessage(message: ClientToBundleRunnerMessage, bundleProcess: cp.ChildProcess) {
        console.log("child handleMessage");
        switch(message.type) {
            case ClientToBundleRunnerMessageType.UpdateRequest:
                const {origin} = this.url;
                const {assets, publicPath} = message.data;
                const ongoingDownloads = assets
                    .map(asset => {
                        console.log("ASSET: " + asset);
                        return asset;
                    })
                    .map(asset => this.download(
                        new url.URL(url.resolve(url.resolve(origin, publicPath), asset)),
                        path.join(this.dirPath, asset)
                    ));
                await Promise.all(ongoingDownloads);
        }
        await super.handleMessage(message, bundleProcess);
    }

    private async recursiveRemoval(pathToRemove: string) {
        await fsAsync.comprehensiveDeleteAsync(pathToRemove);
    }

}