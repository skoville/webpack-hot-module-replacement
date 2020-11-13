# Understanding HMR In Webpack 5

This document will aim to break down in detail how HMR currently works in Webpack 5 so I can update this repo to work with webpack 5.

The key to this understanding will be to compare the webpack 4 file of

https://github.com/webpack/webpack/blob/v4.41.1/lib/HotModuleReplacement.runtime.js

To the webpack 5 version of

https://github.com/webpack/webpack/blob/v5.0.0-beta.29/lib/hmr/JavascriptHotModuleReplacement.runtime.js



exports.hmrDownloadManifest = "__webpack_require__.hmrM";

/**
 * array with handler functions to download chunk updates
 */
exports.hmrDownloadUpdateHandlers = "__webpack_require__.hmrC";

https://github.com/webpack/webpack/blob/e3087eadb38c7525671aa352fb6dd9336668f9df/lib/RuntimeGlobals.js