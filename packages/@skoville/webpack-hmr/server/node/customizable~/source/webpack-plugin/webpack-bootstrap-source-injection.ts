import { CompilerUpdate, webpackFunctionToInjectName } from '@skoville/webpack-hmr-shared-universal-utilities';

const webpackFunctionToInjectNameBootstrapInternal = `hot${webpackFunctionToInjectName[0].toUpperCase()}${webpackFunctionToInjectName.slice(1)}`;

/******************************************
               WEBPACK 5
******************************************/

// This section goes in the jsonp bootstrap.
const customModuleInjectionImpl = 
`__webpack_require__.${webpackFunctionToInjectNameBootstrapInternal} = function(update,  applyHandlers) {
    const manifest = update.${nameof<CompilerUpdate>(_ => _.manifest)};
    const newHash = update.${nameof<CompilerUpdate>(_ => _.hash)};
    const updatedSource = update.${nameof<CompilerUpdate>(_ => _.updatedSource)};

    currentUpdateChunks = {};
    currentUpdate = {};
    currentUpdateRemovedChunks = manifest.${nameof<CompilerUpdate>(_ => _.manifest.removedChunkIds)};
    currentUpdateRuntime = [
        function (webpackRequire) {
            webpackRequire.h = newHash;
        }
    ];
    applyHandlers.push(applyHandler);
    

    const removedModules = manifest.${nameof<CompilerUpdate>(_ => _.manifest.removedModuleIds)};
    removedModules.forEach(function (moduleId) {
        currentUpdate[moduleId] = false;
    });

    const chunkIds = manifest.${nameof<CompilerUpdate>(_ => _.manifest.updatedChunkIds)};
    chunkIds
        .filter(function (chunkId) {
            // __webpack_require__.o is just an alias for installedChunks.hasOwnProperty(chunkId)
            // TODO in the future we could have installed chunks sent as part of request or just have a separate request for getting updated source so that server
            // doesn't sent all of the updated modules down (incluing those which belong to chunks which aren't installed)
            return __webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId] !== undefined;
        })
        .forEach(function (chunkId) {
            currentUpdateChunks[chunkId] = true;
            const moduleIdToSourceMapping = updatedSource[chunkId];
            Object.entries(moduleIdToSourceMapping).forEach(function (entry) {
                var moduleId = entry[0];
                var newModuleSource = entry[1];
                currentUpdate[moduleId] = eval("\n" + newModuleSource + "\n");
            });
        });
}
`;

const managementFnReference =`${webpackFunctionToInjectName}: ${webpackFunctionToInjectNameBootstrapInternal},`;

const managementFnCaller = 
`function ${webpackFunctionToInjectNameBootstrapInternal}(update, applyOptions) {
    if (currentStatus !== "idle") {
        throw new Error("${webpackFunctionToInjectName}() is only allowed in idle status. Current status is instead " + currentStatus);
    }
    setStatus("prepare");
    currentUpdateApplyHandlers = [];
    __webpack_require__.${webpackFunctionToInjectNameBootstrapInternal}(update, currentUpdateApplyHandlers);
    internalApply(applyOptions);
}
`;

const SOURCE_PREFIX = "/******/ ";

const SOURCE_REPLACEMENTS: {matcher: string[], toInsert: string, indentBy: number}[] = [
    {
        matcher: ["		function applyInvalidatedModules() {"],
        indentBy: 2,
        toInsert: managementFnCaller
    },
    {
        matcher: ["				status: function (l) {"],
        indentBy: 4,
        toInsert: managementFnReference
    },
    {
        matcher: ["		__webpack_require__.hmrM = () => {"],
        indentBy: 2,
        toInsert: customModuleInjectionImpl
    }
];

export function injectWebpackHotBootstrapModifications(originalBootstrapSource: string) {
    var source = originalBootstrapSource;
    for (const replacement of SOURCE_REPLACEMENTS) {
        const stringToMatch = replacement.matcher.map(matcherLine => `${SOURCE_PREFIX}${matcherLine}`).join("\n");
        const toInsertPrefix = SOURCE_PREFIX + "\t".repeat(replacement.indentBy);
        const stringToInsert = replacement.toInsert.split("\n").map(line => toInsertPrefix + line.split("    ").join("\t")).join("\n");
        const index = source.indexOf(stringToMatch);
        source = source.substring(0, index) + stringToInsert + '\n' + source.substring(index);
    }
    return source;
}