import { CustomizableWebClient } from '@skoville/webpack-hmr-client-web-customizable';
import { SocketIOSkovilleServerAccessor } from '@skoville/webpack-hmr-client-universal-default-socket-io-accessor';

class DefaultWebClient {
    private readonly customizableWebClient: CustomizableWebClient;
    private readonly skovilleServerAccessor: SocketIOSkovilleServerAccessor;
    public constructor() {
        this.customizableWebClient = new CustomizableWebClient(
            async () => true,
            updateRequest => this.skovilleServerAccessor.submitUpdateRequest(updateRequest)
        );
        this.skovilleServerAccessor = new SocketIOSkovilleServerAccessor(
            CustomizableWebClient.getServerURL(),
            () => this.customizableWebClient.triggerClientUpdateRequest(),
            this.customizableWebClient.getLogger()
        );
    }
}

new DefaultWebClient();