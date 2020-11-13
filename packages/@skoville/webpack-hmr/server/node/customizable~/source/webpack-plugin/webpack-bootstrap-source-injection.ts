import { webpackFunctionToInjectName } from '@skoville/webpack-hmr-shared-universal-utilities';

const hotModuleAttributeLinePrefix = "\t\t";
const webpackBootstrapHotModuleAttributeLineToInsertBefore = `${hotModuleAttributeLinePrefix}check: hotCheck`;

const webpackBootstrapFunctionToInsertBefore = `function hotUpdateDownloaded`;
const webpackFunctionToInjectNameBootstrapInternal = `hot${webpackFunctionToInjectName[0].toUpperCase()}${webpackFunctionToInjectName.slice(1)}`;

// Carefully study the following file for an explanation to understand the reasoning of the injected source below:
// https://github.com/webpack/webpack/blob/master/lib/HotModuleReplacement.runtime.js
const webpackFunctionToInjectSource = `${
  ""}/* Applies hot update downloaded in way other than typical "check" "apply" methods. */
${""}/* @param updatedModuleNameToNewModuleSourceMapping POJSO mapping from update module id to the new source of the module. */
function ${webpackFunctionToInjectNameBootstrapInternal}(newHash, updatedModuleNameToNewModuleSourceMapping) {
    if (hotStatus !== "idle") {
        throw new Error("${webpackFunctionToInjectName}() is only allowed in idle status");
    }
    hotSetStatus("prepare"); // Technically not necessary but kept for consistency.
    hotUpdate = updatedModuleNameToNewModuleSourceMapping;
    hotUpdateNewHash = newHash;
    hotApplyOnUpdate = true;
    hotDeferred = {};
    var outdatedModulesPromise = new Promise(function(resolve, reject) {
        hotDeferred.resolve = resolve;
        hotDeferred.reject = reject;
    });
    hotUpdateDownloaded();
    return outdatedModulesPromise;
}

${webpackBootstrapFunctionToInsertBefore}`;

webpackFunctionToInjectSource;

/*
export function injectWebpackHotBootstrapModifications(originalBootstrapSource: string) {
    return originalBootstrapSource
        .replace(new RegExp(webpackBootstrapHotModuleAttributeLineToInsertBefore, 'g'), 
            `${hotModuleAttributeLinePrefix}${webpackFunctionToInjectName}: ${webpackFunctionToInjectNameBootstrapInternal},\n${webpackBootstrapHotModuleAttributeLineToInsertBefore}`)
        .replace(new RegExp(webpackBootstrapFunctionToInsertBefore, 'g'), webpackFunctionToInjectSource)
}
*/

// Webpack 5
export function injectWebpackHotBootstrapModifications(originalBootstrapSource: string) {
    console.log(originalBootstrapSource);
    return originalBootstrapSource
        .replace(new RegExp(webpackBootstrapHotModuleAttributeLineToInsertBefore, 'g'),
            `${hotModuleAttributeLinePrefix}${webpackFunctionToInjectName}: ${webpackFunctionToInjectNameBootstrapInternal},\n${webpackBootstrapHotModuleAttributeLineToInsertBefore}`)
}

// This section goes in the jsonp bootstrap.
const gogo = `
__webpack__require__.${webpackFunctionToInjectNameBootstrapInternal} = function(manifest, chunkIdToModuleIdToSourceMapping, newHash, applyOptions, applyHandlers) {
    currentUpdateChunks = {};
    currentUpdate = {};
    currentUpdateRemovedChunks = manifest.r;
    currentUpdateRuntime = [
        function (webpackRequire) {
            webpackRequire.h = newHash;
        }
    ];
    applyHandlers.push(applyHandler);
    

    const removedModules = manifest.m;
    removedModules.forEach(function (moduleId) {
        currentUpdate[moduleId] = false;
    });

    const chunkIds = manifest.c;
    chunkIds
        .filter(function (chunkId) {
            return __webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId] !== undefined;
        })
        .forEach(function (chunkId) {
            currentUpdateChunks[chunkId] = true;
            Object.entries(chunkIdToModuleIdSourceMapping[chunkId]).forEach(function (entry) {
                var moduleId = entry[0];
                var newModuleSourceFunction = entry[1];
                currentUpdate[moduleId] = newModuleSourceFunction;
            });
        });

    internalApply(applyOptions); // used to be true, now it appears it can take on options
}
`;

// This section goes in the HRM runtime bootstrap.
const core = `
hot: {
    ...
    update: ${webpackFunctionToInjectNameBootstrapInternal}
    ...
}
...
function ${webpackFunctionToInjectNameBootstrapInternal}(manifest, chunkIdToModuleIdToSourceMapping, newHash, applyOptions) {
    if (currentStatus !== "idle") {
        throw new Error("${webpackFunctionToInjectName}() is only allowed in idle status");
    }
    setStatus("prepare");
    currentUpdateApplyHandlers = [];
    __webpack__require__.${webpackFunctionToInjectNameBootstrapInternal}(
        manifest, chunkIdToModuleIdToSourceMapping, newHash, applyOptions, currentUpdateApplyHandlers
    );
}
`

gogo;
core;