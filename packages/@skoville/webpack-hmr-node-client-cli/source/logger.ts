import { Log } from '@skoville/webpack-hmr-core/shared/log';

export const log = new Log.Logger(async (request: Log.Request) => {
    console.log(request.contents);
});