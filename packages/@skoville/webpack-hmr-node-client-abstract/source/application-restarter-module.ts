import { AbstractClientApplicationRestarterModule } from "@skoville/webpack-hmr-core/client/module/abstract-application-restarter-module";
import { CompilerNotification } from "@skoville/webpack-hmr-core/shared/server-client-notification-model";
import { ClientCommand } from "@skoville/webpack-hmr-core/client/module/command-types";
import { BundleRunnerToClientMessageType, BundleRunnerToClientMessage, 
    ClientToBundleRunnerMessage, ClientToBundleRunnerMessageType  } from "@skoville/webpack-hmr-node-client-cli-data-transfer-object";


// TODO: some of the logic in here seems unrelated to restarting the application.
// I think we need to change it from ApplicationRestarter to something along the
// lines of "PlatformSpecificLogicContainer".
export class NodeClientApplicationRestarterModule extends AbstractClientApplicationRestarterModule {
    private readonly pendingMessages: Record<number, {resolve: ()=>void, done: boolean}>;
    private allocatedSequenceNumbers: number;
    
    // last sequence number applied. The first will be 0.
    // Using this sequence number method allows us to apply messages in-order that they were received;
    // it is a common technique used in distributed systems programming.
    // TODO: find a TypeScript RPC library which abstracts away this sequence number logic.
    private appliedSequenceNumber: number;

    public constructor() {
        super();
        this.pendingMessages = [];
        this.allocatedSequenceNumbers = 0; // total allocated
        this.appliedSequenceNumber = -1;
        
        // This message middleware causes the message to not be applied to the client runtime until the middleware function
        // is finished. Here we are using middleware to see when an HMR update message is incoming, then
        // download the HMR assets (update.json and updated js files) before the HMR runtime tries to load them.
        // We must do this because HMR in node assumes the assets are locally stored, unlike HMR in the web which knows how
        // to download the update files.
        this.subscribePreExecutionMiddleware(ClientCommand.HandleMessage, async message => {
            if(message.type === CompilerNotification.Type.Update) {
                await new Promise(resolve => {
                    const sequenceNumber = this.allocatedSequenceNumbers;
                    this.allocatedSequenceNumbers++;
                    this.pendingMessages[sequenceNumber] = {resolve, done: false};
                    const { publicPath, assets } = message.data;
                    const nodeBundleRunnerMessage: ClientToBundleRunnerMessage = {
                        type: ClientToBundleRunnerMessageType.UpdateRequest,
                        data: { sequenceNumber, publicPath, assets }
                    };
                    this.sendMessageToBundleRunner(nodeBundleRunnerMessage);
                });
            }
        });
        process.on("message", (nodeBundleRunnerResponse: BundleRunnerToClientMessage) => {
            if(nodeBundleRunnerResponse.type !== BundleRunnerToClientMessageType.UpdateResponse) {
                throw new Error("unexpected message sent to child process of " + nodeBundleRunnerResponse);
            }
            const sequenceNumber = nodeBundleRunnerResponse.data.sequenceNumber;
            const pendingMessage = this.pendingMessages[sequenceNumber];
            if(pendingMessage.done) console.log("getting message for already done sequence number"); // not something we expect to happen
            pendingMessage.done = true;
            if(this.appliedSequenceNumber + 1 === sequenceNumber) {
                // Resolve this sequence number and all those that are done afterwards.
                // Continue until you run into a sequence number which is not yet done (meaning there has not been a response yet)
                do {
                    this.pendingMessages[++this.appliedSequenceNumber].resolve();
                    delete this.pendingMessages[this.appliedSequenceNumber];
                } while(
                    this.appliedSequenceNumber + 1 < this.allocatedSequenceNumbers &&
                    this.pendingMessages[this.appliedSequenceNumber + 1].done
                );
            }
        });
    }

    public async restartApplication() {
        this.sendMessageToBundleRunner(
            {type: ClientToBundleRunnerMessageType.Restart},
            () => { process.exit(); }
        );
    }

    private sendMessageToBundleRunner(message: ClientToBundleRunnerMessage, callback: ()=>void = ()=>{}) {
        if(process.send === undefined) {
            throw new Error("unable to send because this process is not a child process");
        } else {
            process.send(message, callback);
        }
    }
}