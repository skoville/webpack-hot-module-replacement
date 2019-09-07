import { CustomizableWebClient } from '@skoville/webpack-hmr-client-web-customizable';
import { SocketIOSkovilleServerAccessor } from '@skoville/webpack-hmr-client-universal-default-socket-io-accessor';

class DefaultWebClient {
    private readonly customizableWebClient: CustomizableWebClient;
    public constructor() {
        const skovilleServerAccessor = new SocketIOSkovilleServerAccessor(
            CustomizableWebClient.getServerURL(),
            async () => {
                console.log("inside on update notification");
                this.customizableWebClient.triggerClientUpdateRequest();
            }
        );
        console.log("hello world");
        this.customizableWebClient = new CustomizableWebClient(
            async () => true,
            updateRequest => {
                console.log("inside update request method")
                return skovilleServerAccessor.submitUpdateRequest(updateRequest)
            }
        );
        console.log("after")
    }
}

new DefaultWebClient();