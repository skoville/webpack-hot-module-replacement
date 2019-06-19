interface ProjectDescriptor {
    configs: {
        "package.json": Object;
        "tsconfig.json": Object;
    }
}

export interface TSMonorepoConfig {
    packageRoot: string;
    baseConfigs: {
        "package.json": Object;
        "tsconfig.json": Object;
    };
    packages: {[packageName: string]: ProjectDescriptor};
}