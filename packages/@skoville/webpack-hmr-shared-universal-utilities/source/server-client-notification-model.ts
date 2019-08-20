export namespace SkovilleServerNotification {
    export enum Type {
        Recompiling = 'recompiling',
        NoChange = 'no-change',
        Update = 'update',
        ForceRestart = 'force-restart'
    }
    export type Body =
    {   type: Type.Recompiling } |
    {   type: Type.NoChange } |
    {   type: Type.Update;
        data: {
            hash: string;
            errors: string[];
            warnings: string[];
            publicPath: string;
            assets: string[];
        }
    } |
    {   type: Type.ForceRestart;
        data: {
            reason: string;
        }
    };
}

export namespace SkovilleClientNotification {
    export enum Type {
        GetLatestHash = 'get-latest-hash'
    }
    export type Body =
    { type: Type.GetLatestHash };
}