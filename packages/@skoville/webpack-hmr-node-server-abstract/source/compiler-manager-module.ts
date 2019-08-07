import { CompilerManager } from './compiler-manager';
import * as webpack from 'webpack';
import { AbstractCompilerManagerModule } from '@skoville/webpack-hmr-core/server/module/abstract-compiler-manager-module';
import { ReadFileRequest, ServerCommand } from '@skoville/webpack-hmr-core/server/module/command-types';
import { AbstractFileStream } from '@skoville/webpack-hmr-core/server/abstract-file-stream';
import { CompilerNotification } from '@skoville/webpack-hmr-core/shared/server-client-notification-model';

export class NodeCompilerManagerRegistryModule extends AbstractCompilerManagerModule {
    private readonly registeredCompilers: Set<webpack.Compiler>;
    private readonly registry: Map<string, CompilerManager>;
    private readonly memoryFS: boolean;

    public constructor(memoryFS: boolean) {
        super();
        this.registeredCompilers = new Set();
        this.registry = new Map();
        this.memoryFS = memoryFS;
    }

    public register(compiler: webpack.Compiler, compilerId: string) {
        if (this.registeredCompilers.has(compiler)) {
            throw new Error(`Detected attempt to register same compiler multiple times.`);
        }
        const compilerManager = new CompilerManager(compiler, this.memoryFS, this.log);
        this.registeredCompilers.add(compiler);
        this.registry.set(compilerId, compilerManager);
        compilerManager.subscribeToCompilerNotifications(async notification => {
            await this.excuteCommand(ServerCommand.CompilerNotification, {notification, compilerId});
        });
    }

    // TODO: remove change the read file request to include a compilerId. The problem with the current request, which only contains a path, is that
    // sometimes there are multiple compiler managers which will have the same asset. This shouldn't be a problem for the
    // hot update manifest and chunk files, as they contain unique hashes in their names, but this could be a problem
    // for cases like an index.html served by 2 web apps or perhaps if the bundle name for two apps is the same.
    // Therefore until we change or replace webpack's HMR plugin to gain control of the download logic, wich would
    // allow us to put the compilerId in GET request headers, which could be passed her, we must ask that clients of this library ensure that no
    // two configurations being hot reloaded using the same server attempt to serve assets with the same name.
    protected async readFile(request: ReadFileRequest): Promise<AbstractFileStream> {
        const readStreams = (await Promise.all(Array.from(this.registry.values())
            .map(compilerManager => compilerManager.getReadStream(request.path))))
            .filter((possibleStream):possibleStream is AbstractFileStream => possibleStream !== false);
        if (readStreams.length === 0) {
            throw new Error(`There are no compilers which contain the file at path '${request.path}'.`);
        } else if (readStreams.length > 1) {
            // More than one compiler has a file which matches this request's path, so we don't know which one to choose.
            // In the future once we are able to send the compilerId as part of the GET request header, then it won't matter
            // if two compilers have the same file, because all ReadFileRequests will be scoped to a specific compilerManager.
            throw new Error(`More than one compiler contains a file which matches the path of '${request.path}'.`);
        }
        return readStreams[0];
    }

    protected async getLastCompilerUpdateNotification(compilerId: string): Promise<CompilerNotification.Body|undefined> {
        const compilerManager = this.registry.get(compilerId);
        if (compilerManager === undefined) {
            throw new Error(`Trying to get last compiler update notification for unregistered compiler with id '${compilerId}'.`);
        }
        return compilerManager.getLatestUpdateNotification();
    }

    protected async checkIfCompilerIsRegistered(compilerId: string): Promise<boolean> {
        return this.registry.has(compilerId);
    }
}