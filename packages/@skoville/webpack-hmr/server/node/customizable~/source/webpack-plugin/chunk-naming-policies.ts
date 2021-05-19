export const CHUNK_NAMING_POLICIES = {
    outputName: "[name].js", // output will have a name of .js
    forbiddenOutputField: [

    ],
    getAssetName: (chunkName: string) => chunkName + ".js"
} as const;