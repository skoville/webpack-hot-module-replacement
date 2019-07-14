export type BundleRunnerToClientMessage = 
    {   type: BundleRunnerToClientMessageType.UpdateResponse;
        data: {
            sequenceNumber: number;
        };
    };

export enum BundleRunnerToClientMessageType {
    UpdateResponse = 'update-response'
}