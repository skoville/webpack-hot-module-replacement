import { CompilerNotification } from "../../shared/server-client-notification-model";
import { SharedCommand } from "../../shared/module/command-types";
import { AbstractFileStream } from "../abstract-file-stream";
import { v4 as generateUUID } from 'uuid';

export type ReadFileRequest = {
    // TODO: add in a compiler id once we have more control over GET requests issued from HotModuleReplacementPlugin
    path: string;
};

export type CompilerNotificationPayload = {
    notification: CompilerNotification.Body;
    compilerId: string;
};

export namespace ServerCommand {
    // TODO: add the foollowing two commands in once we are ready to begin development on dashboard.
    // export const ClientUpdate = Symbol("");
    // export const ServerUpdate = Symbol("");
    export const CompilerNotification = Symbol("compiler notification " + generateUUID());
    export const GetLastCompilerUpdateNotification = Symbol("get last compiler update notification " + generateUUID());
    export const ReadFile =  Symbol("read file " + generateUUID());

    export interface Types extends SharedCommand.Types {
        [CompilerNotification]: [CompilerNotificationPayload, void];
        [GetLastCompilerUpdateNotification]: [string, undefined | CompilerNotification.Body];
        [ReadFile]: [ReadFileRequest, AbstractFileStream];
    }
}