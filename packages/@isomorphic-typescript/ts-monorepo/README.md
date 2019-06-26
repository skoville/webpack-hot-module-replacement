This is a tool which watches a configuration file named `ts-monorepo.json` which resides in the project root and has the following format:

```json
{
    "packageRoot": "packages",
    "baseConfigs": {
        "package.json": {
            "files": ["distribution"],
            "main": "./distribution/package.js",
            "author": "Alexander Leung",
            "license": "MIT"
        },
        "tsconfig.json": {
            "compilerOptions": {
                "module": "commonjs",
                "target": "es6",
                "lib": ["esnext"]
            }
        }
    },
    "packages": {
        "project1": {
            "configs": {
                "package.json": {
                    "description": "some package for node",
                    "scripts": {
                        "custom": "project2-command input"
                    },
                    "dependencies": [
                        "project3",
                        "@types/node"
                    ],
                    "devDependencies": [
                        "project2"
                    ]
                },
                "tsconfig.json": {
                    "types": ["node"]
                }
            }
        },
        "project2": {
            "configs": {
                "package.json": {
                    "description": "some command line tool for node",
                    "bin": {
                        "project2-command": "./distribution/project2-command.js"
                    },
                    "devDependencies": [
                        "@types/node"
                    ]
                },
                "tsconfig.json": {
                    "types": ["node"]
                }
            }
        }
    }
}
```

The config represents a centralized place to store info about a typescript monorepo. Upon change detection, this tool will
1. Validate the config and proceed only if valid.
1. Create package folder with package.json & tsconfig.json . TODO: support arbitrary configs
1. Update existing configs if already present.
1. Update tsconfig-leaves.json, which is a json that resides in the root of the project and contains references to all leave projects (leaf projects are not a dependency of any other).
1. Update lerna.json
1. Run `lerna bootstrap` to setup correct linkages between packages and install added dependencies
1. Restart a `tsc -b --watch --version` process that builds all packages in the tsconfig-leaves.json, therefore building all the packages.

The generated tsconfig.json and package.json files from this tool in each package directory are deep merges of the baseConfig object and config object of individual project, with 2 major
sets of exceptions to this rule: 
1. the behavior of merging "package.json" files' "dependencies", "devDependencies", "peerDependencies" fields is not exactly an array merge. Instead,
the latest versions of the packages listed are always used (fetched from npm), unless the package name is from the monorepo, in which case the lerna version is used.
1. The tsconfig.json files generated =contain references that point to dependency projects' relative paths and contain mandatory

This tool is very opinionated in how a monorepo is managed.  
1. TypeScript build watch is used.
1. TypeScript project references are used.
1. Changes to individual package.jsons and tsconfig.jsons will be watched, and reverted. They must be controlled via the centralized config.
1. All packages will live as direct children under the directory specificed by the `packageRoot` property, unless they are a packaged with a scoped name,
in which case they will live as a direct child of a folder which is named after the scope, then that folder is a direct child of the `packageRoot`.
1. The project forces single versioning via Lerna.
1. Certain tsconfig compilerOptions will be enabled without your choice. They are: "composite", "declaration", "declarationMap", "sourceMap". The reasoning behind this is [here](https://github.com/RyanCavanaugh/learn-a#tsconfigsettingsjson). 

The nice thing about this tool is that now all of your configs are generated from this one monoconfig file, and so tsconfig.json and package.json as individual files of subprojects can go in
the root level gitignore since they are now all managed automatically.

Another nice thing is that now new package setup is very quick, just add entry to config and the tool which watches the config file for saves will do the rest. Essentially declarative programming of the config file.

TODOs:
1. create VSCode extension which understands this config file, showing errors, auto suggesting values, and click to go to npm or other package support.
1. Allow comments in config file.
1. Ideally make lerna irrelevant here.
1. Support independent versioning