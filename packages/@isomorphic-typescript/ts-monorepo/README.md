This is a tool which watches a configuration file with the following format:

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
1. Validates the config and proceeds only if valid.
1. Create package folder with package.json & tsconfig.json + other configs if not present
1. Update existing configs if already present.
1. Update tsconfig-terminal-references.json
1. Update lerna.json if necessary
1. Run `lerna bootstrap` to setup correct linkages between packages
1. Restart a `tsc -b --watch` process w/ tsconfig-terminal-references.json as input

The generated tsconfig.jsons and package.jsons from this tool are deep merges of the baseConfig object and config object of individual project, with 2 major
sets of exceptions: 
1. the behavior of merging "package.json" "dependencies", "devDependencies", "peerDependencies" is not exactly an array merge. Instead,
the latest versions of the packages listed are always used, unless the package name is one of those in the monorepo, in which case the lerna version is used.
1. The tsconfig.json files generated also contain references that point to dependency projects' relative paths

This tool is very opinionated in how a monorepo is managed.  
1. TypeScript build watch is used.
1. TypeScript project references are used.
1. Changes to individual package.jsons and tsconfig.jsons will be watched, and reverted. They must be controlled via the centralized config.
1. All packages will live as direct children under the directory specificed by the `packageRoot` property, unless they are a packaged with a scoped name,
in which case they will live as a direct child of a folder which is named after the scope, then that folder is a direct child of the `packageRoot`.
1. The project forces single versioning via Lerna.

The nice thing about this tool is that now all of your configs are generated from this one monoconfig file, and so tsconfig.json and package.json of subprojects can go in
the root level gitignore.

Another nice thing is that now new package setup is very quick, just add entry to config and the tool which watches the config file for saves will do the rest. Essentially declarative programming of the config file.

TODOs:
1. create VSCode extension which understands this config file, showing errors, auto suggesting values, and click to go to npm or other package support.
1. Allow comments in config file.
1. Ideally make lerna irrelevant here.
1. Support independent versioning