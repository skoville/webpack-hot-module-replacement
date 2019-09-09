/**
 * /lib/web/JsonpMainTemplate.runtime.js
 * 
 * hotDownloadManifest(requestTimeout: number)
 * - $require$.p
 * - $hotMainFilename$
 * 
 * - returns Promise<void | update JSON?>
 * ^ void means no update available, 
 * 
 * hotDownloadUpdateChunk(chunkId)
 * - $require$.p
 * - $hotChunkFilename$
 * - $crossOriginLoading$
 * 
 * - window.webpackHotUpdate (directly calls hotAddUpdateChunk)
 */

/**
 * /lib/web/WebWorkerMainTemplate.runtime.js
 * 
 * hotDownloadUpdateChunk(chunkId)
 * - importScripts <--- Requires further investigation
 * - $require$.p
 * - $hotChunkFilename$
 * 
 * - window.webpackHotUpdate (directly calls hotAddUpdateChunk)
 * <--- Actual chunk js of WebWorker requires further investigation
 * 
 * hotDownloadManifest(requestTimeout: number)
 * - $require$.p
 * - $hotMainFilename$
 * 
 * - returns Promise<void | update JSON?>
 * ^ void means no update available, 
 */

/**
 * /lib/node/NodeMainTemplateAsync.runtime.js
 * 
 * hotDownloadUpdateChunk(chunkId)
 * - __dirname
 * - $hotChunkFilename$
 * - $require$.onError
 * - $require$.oe
 * - require("vm").runInThisContext
 * - hotAddUpdateChunk(chunkId, chunk.modules)
 * <--- The modeule js content itself requires further investigation
 * 
 * hotDownloadManifest()
 * - __dirname
 * - $hotMainFilename$
 * 
 * - returns Promise<update JSON?>
 */

/**
 * /lib/node/NodeMainTemplate.runtime.js
 * 
 * 
 */