#!/usr/bin/env node
import { fsAsync } from './fs-async';
import * as path from 'path';
import * as ansicolor from 'ansicolor';
import * as chokidar from 'chokidar';
import * as deepmerge from 'deepmerge';
import * as latestVersion from 'latest-version';
import validateNpmPackageName = require('validate-npm-package-name');
import validate from './config.validator';

import { PackageJSON } from './config';
import { recursivelyDeleteDirectoryAsync } from './recursive-delete-directory';
import { log } from './log';

type JSONPrimitive = string | number | boolean | null | Object | any[];

function deepComparison(oldObj: any, newObj: any, fieldDepth: string): string[] {
    const oldObjKeys = Object.keys(oldObj);
    const newObjKeys = Object.keys(newObj);
    const fields = new Set<string>([...oldObjKeys, ...newObjKeys]);
    const differences: string[] = [];
    function representation(value?: JSONPrimitive) {
        if(value === undefined) return "";
        if(typeof value === 'object') {
            if (Array.isArray(value)) {
                return " [" + value.length + "]";
            } else {
                return " {...}";
            }
        } else if (typeof value === 'string') {
            return ` "${value}"`;
        } else {
            return " " + new String(value);
        }
    }
    function explainDifference(field: string, newValue?: JSONPrimitive, oldValue?: JSONPrimitive) {
        const action = 
            newValue === undefined ? "Remove" :
            oldValue === undefined ? "   Add" :
                                     "Change";
        differences.push(`${action} ${fieldDepth}[${ansicolor.white(field)}]:${ansicolor.red(representation(oldValue))}${ansicolor.green(representation(newValue))}`);
    }
    fields.forEach(field => {
        const oldField = oldObj[field];
        const oldIsObject = typeof oldField === 'object';

        const newField = newObj[field];
        const newIsObject = typeof newField === 'object';

        if (!oldIsObject && !newIsObject) {
            if (oldField !== newField) explainDifference(field, newField, oldField);
        } else if (oldIsObject !== newIsObject) {
            explainDifference(field, newField, oldField);
        }
        if (oldIsObject || newIsObject) {
            deepComparison(oldIsObject ? oldField : {}, newIsObject? newField : {}, fieldDepth + "[" + ansicolor.white(field) + "]")
            .forEach(difference => {
                differences.push(difference);
            });
        }
    });
    return differences;
}

async function main() {
    const configFileRelativePath = "ts-monorepo.json";
    const configAbsolutePath = path.resolve(configFileRelativePath);
    const doesTheConfigFileExist = await fsAsync.exists(configAbsolutePath);

    async function update() {
        const stats = await fsAsync.statistics(configAbsolutePath);
        if (!stats.isFile()) {
            throw new Error("The config file path '" + configFileRelativePath + "' points to a directory instead of a file; it must point to a config file.");
        }

        // Read config file.
        const configFile = await fsAsync.readFile(configAbsolutePath);
        const configFileContents = configFile.toString();
        // TODO: Remove comments

        // parse as json
        const configFileJSON = validate(JSON.parse(configFileContents));

        // Validate the package root.
        if (configFileJSON.packageRoot.length === 0) {
            log.error("The 'packageRoot' field may not be empty.");
            return;
        }
        if (configFileJSON.packageRoot.includes("/") || configFileJSON.packageRoot.includes("\\")) {
            log.error(`The value of the 'packageRoot' field '${ansicolor.white(configFileJSON.packageRoot)}' currently contains at least one of the forbidden characters '/' or '\\'.`);
            return;
        }
        if (configFileJSON.packageRoot === "." || configFileJSON.packageRoot === "..") {
            log.error(`The value of the 'packageRoot' field '${ansicolor.white(configFileJSON.packageRoot)}' is illegal.`);
            return;
        }
        const packageRootAbsolutePath = path.resolve(".", configFileJSON.packageRoot);

        log.info(`packageRoot absolute path is '${packageRootAbsolutePath}'`);

        const packageRootExists = await fsAsync.exists(packageRootAbsolutePath);
        if (!packageRootExists) {
            log.error(`The value of the config file's 'packageRoot' field '${ansicolor.white(configFileJSON.packageRoot)}' does not reference a real filesystem object.`);
            return;
        }
        const packageRootStats = await fsAsync.statistics(packageRootAbsolutePath);
        if (!packageRootStats.isDirectory()) {
            log.error(`The value of the config file's 'packageRoot' field '${ansicolor.white(configFileJSON.packageRoot)}' does not reference a directory.`);
            return;
        }

        // Validate each package name
        var foundIssueWithAtLeastOnePackageName = false;

        if (Object.keys(configFileJSON.packages).length === 0) {
            log.error("Config file must have at least one package");
            return;
        }

        for(const packageName in configFileJSON.packages) {
            const validationResult = validateNpmPackageName(packageName);
            if(!validationResult.validForNewPackages) {
                log.error(`'${ansicolor.white(packageName)}' is not a valid npm package name`);
                foundIssueWithAtLeastOnePackageName = true;
            }
        }
        if (foundIssueWithAtLeastOnePackageName) return;

        const lernaJSONPackagePaths = new Set<string>();

        // Sync each package name
        for (const packageName in configFileJSON.packages) {
            const nameParts = packageName.split("/");
            const nameIsScoped = nameParts.length === 2;
            const relativePackagePath = configFileJSON.packageRoot + '/' + packageName;
            const packageDirectoryAbsolutePath = path.resolve("./" + relativePackagePath);
            if (nameIsScoped) { // Means we have @scope-name/package-name pattern
                log.info(`package '${ansicolor.magenta(packageName)}' is scoped.`);
                const scopedFolder = configFileJSON.packageRoot + "/" + nameParts[0];
                lernaJSONPackagePaths.add(scopedFolder + "/*");
                const scopedFolderAbsolutePath = path.resolve("./" + scopedFolder);
                const scopedFolderExists = await fsAsync.exists(scopedFolderAbsolutePath);
                if (scopedFolderExists) {
                    // Let's make sure it's a directory. If not we'll make sure it ends up that way.
                    const scopedFolderStats = await fsAsync.statistics(scopedFolderAbsolutePath);
                    if (scopedFolderStats.isFile()) {
                        log.warn(`Currently there is a file at '${ansicolor.green(scopedFolder)}' instead of the expected directory`);
                        log.warn("Replacing the file with a folder...");
                        await fsAsync.deleteFile(scopedFolderAbsolutePath);
                        log.info(`Creating the scope directory '${ansicolor.cyan(scopedFolder)}'`);
                        await fsAsync.makeDirectory(scopedFolderAbsolutePath);
                    }
                } else {
                    log.info(`Creating the scope directory '${ansicolor.cyan(scopedFolder)}'`);
                    await fsAsync.makeDirectory(scopedFolderAbsolutePath);
                }
            } else {
                lernaJSONPackagePaths.add(configFileJSON.packageRoot + "/*");
            }

            // Let's see if the package folder itself exists now that we've dealt with scoping.
            const doesPackageDirectoryExists = await fsAsync.exists(packageDirectoryAbsolutePath);
            if (!doesPackageDirectoryExists) {
                log.info(`The package directory '${ansicolor.cyan(relativePackagePath)}' doesn't exist. Creating it now...`);
                await fsAsync.makeDirectory(packageDirectoryAbsolutePath);
            }

            await Promise.all([
                (async function syncPackageJSON() {

                    const resultingPackageJSONObj: PackageJSON = deepmerge(
                        configFileJSON.baseConfigs["package.json"], 
                        configFileJSON.packages[packageName].configs["package.json"]
                    );
                    (resultingPackageJSONObj as any).name = packageName;
                    (resultingPackageJSONObj as any).version = configFileJSON.version;

                    interface Dependency {
                        name: string;
                        version: string;
                    }

                    async function resolveDependencies(dependencies: string[] | undefined): Promise<{[dependency: string]: string} | undefined> {
                        if (dependencies === undefined) return undefined;
                        const result: Record<string, string> = {};
                        const deps: Dependency[] = await Promise.all(dependencies.map(async dependency => {
                            if (Object.keys(configFileJSON.packages).includes(dependency)) {
                                return {
                                    name: dependency,
                                    version: "^" + await latestVersion(dependency)
                                };
                            } else {
                                return {
                                    name: dependency,
                                    version: configFileJSON.version
                                };
                            }
                        }));
                        deps.forEach(dep => {
                            result[dep.name] = dep.version;
                        });
                        return result;
                    }

                    const [dependencies, devDependencies, peerDependencies] = await Promise.all([
                        resolveDependencies(resultingPackageJSONObj.dependencies),
                        resolveDependencies(resultingPackageJSONObj.devDependencies),
                        resolveDependencies(resultingPackageJSONObj.peerDependencies)
                    ]);
                    if (dependencies) (resultingPackageJSONObj as any).dependencies = dependencies;
                    if (devDependencies) (resultingPackageJSONObj as any).devDependencies = devDependencies;
                    if (peerDependencies) (resultingPackageJSONObj as any).peerDependencies = peerDependencies;
                    
                    const relativePackageJSONPath = relativePackagePath + "/" + "package.json";
                    const absolutePackageJSONPath = path.resolve(packageDirectoryAbsolutePath, "package.json");

                    const packageJSONOutput = JSON.stringify(resultingPackageJSONObj, null, 2);

                    log.info("absolute packageDirectoryPath is " + packageDirectoryAbsolutePath);
                    log.info("absolute packageJSONPath is " + absolutePackageJSONPath);

                    // Check if the current package.json if it exists. Write no matter what, but the preemptive read allows us to 
                    // notify the client if it was created for the first time.
                    const packageJSONExists = await fsAsync.exists(absolutePackageJSONPath);
                    if (packageJSONExists) {
                        log.info(`The file '${ansicolor.green(relativePackageJSONPath)}' exists.`);
                        const packageJSONStats = await fsAsync.statistics(absolutePackageJSONPath);
                        if (packageJSONStats.isDirectory()) {
                            log.warn(`Currently the package.json file for the package '${packageName}' is a folder. This will be deleted and replaced with a package.json file.`);
                            await recursivelyDeleteDirectoryAsync(absolutePackageJSONPath);
                            log.info(`Creating '${relativePackageJSONPath}' with contents\n${packageJSONOutput}`);
                        } else {
                            // Already existed and was a file, so we will be making sure to print every exact change we are making to this package.json as we update.
                            const currentPackageJSONContents = (await fsAsync.readFile(absolutePackageJSONPath)).toString();
                            var parseFailed = false;
                            var contents: any;
                            try {
                                contents = JSON.parse(currentPackageJSONContents);
                            } catch(e) {
                                parseFailed = true;
                                log.info(`Replacing current text of '${relativePackageJSONPath}' with contents\n${packageJSONOutput}`);
                            }
                            if (!parseFailed && contents !== undefined) {
                                // Deep compare
                                const differences = deepComparison(contents, resultingPackageJSONObj, "");
                                if (differences.length > 0) {
                                    log.trace(ansicolor.green(relativePackageJSONPath));
                                }
                                differences.forEach(explanation => {
                                    log.info(explanation);
                                });
                            }
                        }
                    } else {
                        log.info(`Creating file '${ansicolor.green(relativePackageJSONPath)}' with contents\n${packageJSONOutput}`);
                    }

                    await fsAsync.writeFile(absolutePackageJSONPath, packageJSONOutput);

                })(),
                (async function syncTSConfigJSON() {



                })()
            ]);
        }
    }

    var timesAdded = 0;

    if (!doesTheConfigFileExist) {
        log.error("Could not find '" + configFileRelativePath + "' in current working directory.");
        log.info(ansicolor.green("Waiting for changes..."));
    }

    var currentAction = Promise.resolve();

    function runUpdate(message?: string) {
        currentAction = currentAction.then(() => {
            if (message) log.info(message);
            return update()
                .catch((e) => {
                    log.error(e.message);
                    console.log(e);
                })
                .finally(() => {
                    log.info(ansicolor.green("Waiting for changes..."));
                });
        });
    }

    var restarting = false;
    function restartProgram(idempotentPreRestart?: Function) {
        if (restarting) return;
        restarting = true;
        if (idempotentPreRestart) idempotentPreRestart();
        log.trace("Restarting process...");
        setTimeout(() => {
            process.on("exit", function () {
                require("child_process").spawn(process.argv.shift(), process.argv, {
                    cwd: process.cwd(),
                    detached : true,
                    stdio: "inherit"
                })//.unref();
            });
            process.exit();
        }, 20);
    }

    chokidar.watch(configAbsolutePath)
        .on("change", _path => {
            setTimeout(() => {
                runUpdate(ansicolor.white("Detected change in config file."));
            }, 50);
        })
        .on("add", _path => { // If the file already exists when initially run, then add will fire.
            timesAdded++;
            // has been added again, can begin listening.
            if (timesAdded > 1) {
                runUpdate(ansicolor.green("The config file has been added again."));
            } else {
                runUpdate(ansicolor.green((!doesTheConfigFileExist ? "The config file has been created. " : "") + "Running initial sync."));
            }
        })
        .on("unlink", _path => {
            log.warn("The config file has been removed.. Please add it again to resume watching.");
        })
        .on("error", error => {
            restartProgram(() => {
                log.error("Chokidar Error with name '" + error.name + "': " + error.message + (error.stack ? "\n" + ansicolor.default(error.stack) : ""));
            });
        });

    
    chokidar.watch(__dirname)
        .on("change", () => {
            restartProgram(() => {
                log.info("Detected change in program itself.");
            });
        });
}

main();

// Have to do this because I use goddamn MinTTy w/ Msys2. https://github.com/nodejs/node/issues/16103
// From https://thisdavej.com/making-interactive-node-js-console-apps-that-listen-for-keypress-events/
/*
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
//(process.stdin as any).setRawMode(true);
process.stdin.on('keypress', (_str, key) => {
    if(key.name === 'q') {
        console.log("quitting");
        process.exit();
    }
});
*/