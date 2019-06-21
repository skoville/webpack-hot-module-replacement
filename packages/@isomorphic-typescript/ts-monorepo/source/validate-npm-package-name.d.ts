declare module 'validate-npm-package-name' {
    interface result {
        validForNewPackages: boolean;
        validForOldPackages: boolean;
        warnings?: string[];
        errors?: string[];
    }
    function validateFunction(name: string): result;
    const validate: typeof validateFunction & { scopedPackagePattern: RegExp };
    export = validate;
}