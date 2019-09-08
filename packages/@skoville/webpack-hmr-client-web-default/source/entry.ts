import { CustomizableWebClient } from '@skoville/webpack-hmr-client-web-customizable';
import { SocketIOSkovilleServerAccessor } from '@skoville/webpack-hmr-client-universal-default-socket-io-accessor';

class DefaultWebClient {
    private readonly customizableWebClient: CustomizableWebClient;
    public constructor() {
        const skovilleServerAccessor = new SocketIOSkovilleServerAccessor(
            CustomizableWebClient.getServerURL(),
            async () => {
                this.customizableWebClient.triggerClientUpdateRequest();
            }
        );
        this.customizableWebClient = new CustomizableWebClient(
            async () => true,
            updateRequest => skovilleServerAccessor.submitUpdateRequest(updateRequest)
        );
    }
}

new DefaultWebClient();