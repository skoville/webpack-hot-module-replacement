import { CustomizableNodeClient } from '@skoville/webpack-hmr-client-node-customizable';
import { SocketIOSkovilleServerAccessor } from '@skoville/webpack-hmr-client-universal-default-socket-io-accessor';

class DefaultNodeClient {
    private readonly customizableWebClient: CustomizableNodeClient;
    public constructor() {
        const skovilleServerAccessor = new SocketIOSkovilleServerAccessor(
            CustomizableNodeClient.getServerURL(),
            async () => {
                this.customizableWebClient.triggerClientUpdateRequest();
            }
        );
        this.customizableWebClient = new CustomizableNodeClient(
            async () => true,
            updateRequest => skovilleServerAccessor.submitUpdateRequest(updateRequest),
            async () => ""
        );
    }
}

new DefaultNodeClient();