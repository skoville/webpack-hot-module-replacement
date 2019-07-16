export type ClientToBundleRunnerMessage = 
    {   type: ClientToBundleRunnerMessageType.Restart; } |
    {   type: ClientToBundleRunnerMessageType.UpdateRequest;
        data: {
            publicPath: string;
            assets: string[];
            sequenceNumber: number;
        };
    }

export enum ClientToBundleRunnerMessageType {
    Restart = 'restart',
    UpdateRequest = 'update-request'
}