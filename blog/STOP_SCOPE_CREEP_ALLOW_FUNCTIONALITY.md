# Ending Scope Creep Without Limiting Functionality

Webpack Dev Server has features that seem almost entirely orthogonal to its primary goal of providing HMR and in-memory bundle serving, which seems to have been a factor that has lead to its bloat and current lack of maintainability. Below I list some of the core features that WebpackDevServer provides which I consider scope creep. After, I show an example of how all those same features could easily be implemented by using a theoretical WebpackDevSecOpsServer API alongside a Node.js API so that these scope-creep features can remain outside the scope of this project, allowing the WebpackDevSecOpsServer API to remain small and focused.

### 1. Proxy Server

Webpack Dev Server allows consumers to [proxy](https://webpack.js.org/configuration/dev-server/#devserver-proxy) certain requests that pass through the server to a different URL. Thus WebpackDevServer is not only an in-memory bundler and HMR provider, but it is also a proxy server (scope creep). Users designate this functionality in the devServer configuration:

```JavaScript
module.exports = {
    ...
    devServer: {
        ...
        proxy: {
            '/api':'http://localhost:3000'
        },
        ...
    },
    ...
};
```

which would route any requests with a request path prefix of `/api` to `http://localhost:3000/api` followed by the rest of the path. Since this encourages users to use WebpackDevServer as a proxy server, which could be public-facing, then it also means that WebpackDevServer must implement options to enable https, filter out requests from unknown hosts, send specific headers in responses, and bind to particular hostname (more scope creep).

```JavaScript
module.exports = {
    ...
    devServer: {
        ...
        https: {
            key: fs.readFileSync('/path/to/server.key'),
            cert: fs.readFileSync('/path/to/server.crt'),
            ca: fs.readFileSync('/path/to/ca.pem')
        },
        pfx: '/path/to/file.pfx',
        pfxPassphrase: 'passphrase',
        allowedHosts: ['host.com', 'subdomain.host.com', 'subdomain2.host.com', 'host2.com'],
        disableHostCheck: false,
        headers: {
            'X-Custom-Foo': 'bar',
            'X-Custom-Hello': 'world'
        },
        host: '0.0.0.0',
        ...
    },
    ...
};
```

### 2. Static File Server

Webpack Dev Server allows users to [specify](https://webpack.js.org/configuration/dev-server/#devserver-contentbase) one or more paths from which static files should be served, and in addition can [prompt full client-side reloads](https://webpack.js.org/configuration/dev-server/#devserver-watchcontentbase) when any one file in the static file path (called `contentBase`) is changed.

```JavaScript
module.exports = {
    ...
    devServer: {
        ...
        contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'assets')],
        staticOptions: {
            redirect: false
        },
        watchContentBase: true,
        ...
    },
    ...
};
```

### 3. URL Rewriter

Often times the bundle being served by Webpack Dev Server is a single page application (SPA). SPAs often have client-side routing built-in so a change in url does not cause a GET request to the server for a new page load, and instead the page URL is updated dynamically via JavaScript. In these cases the URL changes without a GET request being made, and this is done through browsers' native [History modification API](https://developer.mozilla.org/en-US/docs/Web/API/History_API#Adding_and_modifying_history_entries). This results in cases where a developer is on for example a path called `/account/update` when the HMR client decides to do a full page reload. The server needs to know that `/`, `/account/update` and potentially many other paths need to all load `index.html` and the associated webpack bundle file.

```JavaScript
module.exports = {
    ...
    devServer: {
        ...
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: '/views/landing.html' },
                { from: /^\/subpage/, to: '/views/subpage.html' },
                { from: /./, to: '/views/404.html' }
            ]
        },
        ...
    },
    ...
};
```

This feature could be easily offloaded to the developer consuming the library, and they could accomplish this same task in roughly the same number of lines of code as is in this configuration.

### 4. Generally Extensible Web Server

It is still acknowledged by the webpack dev server authors that the above feature set may not cover all of the customization preferences, so they allow direct manipulation of the Express app that is created internally.

```JavaScript
module.exports = {
    ...
    devServer: {
        ...
        after: function(app, server) {
            app.get('/some/path', function(req, res) {
                res.json({ custom: 'response' });
            });
        },
        before: function(app, server) {
            ...
        },
        port: 8080,
        ...
    },
    ...
};
```

### 5. Random other unnecessary scope-creep.

For some reason the maintainers decided to add in [bonjour](https://en.wikipedia.org/wiki/Bonjour_(software)) broadcasting into the core library. This seems like a pretty niche feature that has no business polluting the core logic.

### Solution

In the spirit of maintaining a limited, minimal scope, here is how these same exact features might be implemented in tandem with a theoretical WebpackDevSecOpsServer API having a limited scope.

```TypeScript
import https from 'https';
import url from 'url';

import ws from 'ws';
import express from 'express';
import httpProxy from 'http-proxy';
import webpack from 'webpack';
import bonjour from 'bonjour';
import chokidar from 'chokidar';
import {WebpackDevSecOpsServer} from 'webpack-dev-sec-ops-server';

// BUNDLE_NAMES is a TypeScript string Enum
import {config, BUNDLE_NAMES} from './webpack.config';

const wss = new ws.Server({noServer: true});
const app = express();

const compiler = webpack(config);
const devSecOps = new WebpackDevSecOpsServer(compiler, wss);

// Proxy certain requests
const apiProxy = httpProxy.createProxyServer();
app.get("/api/*", function(req, res) {
    apiProxy.web(req, res, {target: "http://localhost:3000"});
});
app.all("*", (req, res, next) => {
    // Filter out unknown hosts
    const allowedHosts = ['host.com', 'subdomain.host.com', 'subdomain2.host.com', 'host2.com'];
    if (allowedHosts.indexOf(req.hostname) === -1) {
        res.send('Invalid Host header');
    } else {
        // Send specific headers
        ({
            'X-Custom-Foo': 'bar',
            'X-Custom-Hello': 'world'
        }).forEach((headerVal, headerKey) => 
            res.setHeader(headerKey, headersVal)
        );
        next();
    }
});
// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));
// Serve bundles (which are in-memory and not written to disk)
app.param('bundle_name', function(req, res, next, bundleName) {
    if(Object.values(BUNDLE_NAMES).indexOf(bundleName) !== -1) {
        res.setHeader('Content-Type', 'application/javascript');
        devSecOps.getBundle(bundleName).createReadStream().pipe(res);
    } else {
        next();
    }
});
app.get('/bundle/:bundle_name', function(req, res, next) {
    next();
});
// Reload client when static files change
const watcher = chokidar.watch(watchPath, options);
watcher.on('change', () => {
    devSecOps.getBundle(BUNDLE_NAMES.WEB_CLIENT).forceClientReload();
});
// Other general extensions
app.get('/some/path', function(req, res) {
    res.json({ custom: 'response' });
});
// Rewrite URLs
app.get("*", function(req, res) {
    res.setHeader('Content-Type', 'application/javascript');
    const pathname = url.parse(req.url).pathname;
    if(pathname === "/")
        fs.createReadStream(path.join(__dirname, "views", "landing.html")).pipe(res);
    else if(pathname.startsWith("/subpage"))
        fs.createReadStream(path.join(__dirname, "views", "subpage.html")).pipe(res);
    else 
        fs.createReadStream(path.join(__dirname, "views", "404.html")).pipe(res);
});
// Customize host & port + https
const port = 8080;
const host = '0.0.0.0';
const server = https.createServer({
    // Traditional cert
    key: fs.readFileSync('/path/to/server.key'),
    cert: fs.readFileSync('/path/to/server.crt'),
    ca: fs.readFileSync('/path/to/ca.pem')
    // Or pfx
    pfx: '/path/to/file.pfx',
    passphrase: 'passphrase'
}, app);
server.on('upgrade', function(req, socket, head) {
    wss.handleUpgrade(req, socket, head, function done(webSocket) {
        wss.emit('connection', webSocket, req);
    });
});
server.listen({
    port,
    host
}, function() {
    console.log(`listening on port ${port}, bound to ${host}`);
});
// Bonjour broadcast (Not sure if this is right)
const bonjourInstance = bonjour();
bonjourInstance.publish({
    name: 'Webpack Dev Sec Ops Server',
    host,
    port,
    type: 'http',
    subtypes: [ 'webpack' ]
});
process.on('exit', () => {
    bonjourInstance.unpublishAll(() => {
        bonjourInstance.destroy();
    });
});
```

This approach clearly is far more verbose than a few options in a config object, however

1. Now users have more control over exactly how the devServer should serve its content. Perhaps they want a slightly different setup which would require them to tweak the above code slightly, which would not be possible when all of the implementation is implemented internally as is the case with Webpack Dev Server.
1. Most of the time users will not need all of these features out of the box, so they will not need to write all of the above boilerplate code, only a subset of it, modified slightly to suit their needs.

In addition, now that all of these features are cut from the core library, the core library is more maintainable since there are less features to implement and keep up-to-date. More maintainable = quicker iterations = more releases = better library.

Now all we need to worry about are literally three methods (as opposed to the additional 15 configuration features that had to be implemented):

1. constructor: `const devSecOps = new WebpackDevSecOpsServer(compiler, wss);`
1. serving bundles: `devSecOps.getBundle(bundleName).createReadStream().pipe(res);`
1. forcing client reloads: `devSecOps.getBundle(BUNDLE_NAMES.WEB_CLIENT).forceClientReload();`

After removing all the implementations associated with the 15 configuration features that seem more like scope-creep than necessities, I was able to get a working version of WebpackDevServer that had 73% less code than before! This was a reduction of the code from 900 lines to about 240.

There would likely be more methods than the three listed, but the point is that by removing features from the webpack dev server which are orthogonal to its core purpose, we are left with more bandwidth to implement more core features which are more applicable to what the dev server offers, for example by allowing a rich plugin system for extending or tapping into certain steps in the dev server processes, or extending the dev server to become a DevOps server, which is the goal of this project.