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
    sourceLocation: {
        start: SourcePosition;
        end: SourcePosition;
    }
}

export type CompilerUpdate = {
    hash: string;
    errors: Exception[];
    warnings: Exception[];
    assets: string[];
    updatedModuleSources: Record<string, string>;
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