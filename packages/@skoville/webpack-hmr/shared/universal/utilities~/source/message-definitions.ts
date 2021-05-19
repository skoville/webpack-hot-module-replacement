/**
 * This file is meant to define all message structure standards shared accross the Skoville project.
 * The messages define a protocol used to communicate with any Skoville server implementation.
 */

export type UpdateRequest = {
    webpackConfigurationName: string;
    currentHash: string;
    clientId?: string;
}
export type SourcePosition = {
    line: number;
    column: number;
}

export type Exception = {
    message: string;
    fileName: string;
    sourceLocation: any // for webpack 5 (temporary)
    /* OG
    {
        start: SourcePosition;
        end: SourcePosition;
    }
    */
}

export type CompilerUpdate = {
    hash: string;
    errors: Exception[];
    warnings: Exception[];
    assets: string[];
    manifest: {
        updatedChunkIds: string[];  // field "c" in typical webpack manifest json
        removedChunkIds: string[];  // field "r" in typical webpack manifest json
        removedModuleIds: string[]; // field "m" in typical webpack manifest json
    };
    updatedSource: {
        [chunkId: string]: {
            [moduleId: string]: string;
        };
    };
}

export type UpdateResponse =
    {
        webpackConfigurationNameRegistered: false;
    } |
    {
        webpackConfigurationNameRegistered: true;
        compatible: false;
        clientId: string;
    } |
    {
        webpackConfigurationNameRegistered: true;
        compatible: true;
        clientId: string;
        updatesToApply: CompilerUpdate[];
    };


// New definitions (after DB and webpack 5 added)

// Tag compilation (compilation name, compilation version, tag name)
// Get compilation versions & hashes & tags (compilation name)
// Get chunks for compilation (compilation name, compilation version)
// Get modules for chunk (compilation name, compilation version, chunk id)
// Get chunk source (compilation name, compilation version, chunk id) -> stream
// Get module source (compilation name, compilation version, chunk id, module id) -> stream
// Get update (compilation name, version start, version end, installed chunk ids) -> 
// Register client (compilation name, version, entry chunk id) -> client id
// Client Health Check (compilation name, version, client id) -> desired target compilation version