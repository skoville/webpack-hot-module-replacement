export type UpdateRequest = {
    webpackConfigurationName: string;
    currentHash: string;
    clientId?: string;
}

export type CompilerUpdate = {
    hash: string;
    errors: string[];
    warnings: string[];
    assets: string[];
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