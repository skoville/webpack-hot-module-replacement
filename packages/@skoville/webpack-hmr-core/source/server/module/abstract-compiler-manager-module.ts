import { AbstractServerModule } from "./abstract-module";
import { ServerCommand, ReadFileRequest } from "./command-types";
import { AbstractFileStream } from "../abstract-file-stream";
import { CompilerNotification } from "../../shared/server-client-notification-model";

export abstract class AbstractCompilerManagerModule extends AbstractServerModule<[typeof ServerCommand.ReadFile, typeof ServerCommand.GetLastCompilerUpdateNotification], [typeof ServerCommand.CompilerNotification]> {
    protected constructor() {
        super({
            [ServerCommand.ReadFile]: request => this.readFile(request),
            [ServerCommand.GetLastCompilerUpdateNotification]: compilerId => this.getLastCompilerUpdateNotification(compilerId)
        }, "[Compiler Manager] ");
    }
    protected abstract async readFile(request: ReadFileRequest): Promise<AbstractFileStream>;
    protected abstract async getLastCompilerUpdateNotification(compilerId: string): Promise<CompilerNotification.Body|undefined>;
}