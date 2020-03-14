import { webpackFunctionToInjectName } from '@skoville/webpack-hmr-shared-universal-utilities';

const hotModuleAttributeLinePrefix = "\t\t"
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

export function injectWebpackHotBootstrapModifications(originalBootstrapSource: string) {
    return originalBootstrapSource
        .replace(new RegExp(webpackBootstrapHotModuleAttributeLineToInsertBefore, 'g'), 
            `${hotModuleAttributeLinePrefix}${webpackFunctionToInjectName}: ${webpackFunctionToInjectNameBootstrapInternal},\n${webpackBootstrapHotModuleAttributeLineToInsertBefore}`)
        .replace(new RegExp(webpackBootstrapFunctionToInsertBefore, 'g'), webpackFunctionToInjectSource)
}