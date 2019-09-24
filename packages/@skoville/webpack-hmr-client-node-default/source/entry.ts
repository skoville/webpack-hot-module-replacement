import { CustomizableNodeClient } from '@skoville/webpack-hmr-client-node-customizable';
import { SocketIOSkovilleServerAccessor } from '@skoville/webpack-hmr-client-universal-default-socket-io-accessor';

class DefaultNodeClient {
    private readonly customizableWebClient: CustomizableNodeClient;
    private readonly skovilleServerAccessor: SocketIOSkovilleServerAccessor;
    public constructor() {
        this.customizableWebClient = new CustomizableNodeClient(
            () => true,
            updateRequest => this.skovilleServerAccessor.submitUpdateRequest(updateRequest)
        );
        this.skovilleServerAccessor = new SocketIOSkovilleServerAccessor(
            CustomizableNodeClient.getServerURL(),
            () => this.customizableWebClient.triggerClientUpdateRequest(),
            this.customizableWebClient.getLogger()
        );
    }
}

new DefaultNodeClient();