#!/usr/bin/env node
import { fsAsync } from './fs-async';
import * as path from 'path';
import * as ansicolor from 'ansicolor';
import * as chokidar from 'chokidar';
import validateNpmPackageName = require('validate-npm-package-name');

import { TSMonorepoConfig } from './config';
import { recursivelyDeleteDirectoryAsync } from './recursive-delete-directory';
import { log } from './log';

function printUsage() {
    console.log(
        "Usage: " + ansicolor.white("ts-monorepo ") + "<" + ansicolor.magenta("config-relative-path") + ">\n" +
        ansicolor.magenta("config-relative-path") + ": Relative path from cwd where script is run to the ts-monorepo.json file"
    );
}

function errorAndExit(message: string) {
    log.error(message + "\n");
    log.info("Exiting.");
    printUsage();
    process.exit();
}

// Get config file.
const configFileRelativePath = process.argv[2];

if (configFileRelativePath === undefined) {
    errorAndExit("The config file relative path argument was not found.");
}

async function main() {
    const configAbsolutePath = path.resolve(configFileRelativePath);
    const doesTheConfigFileExist = await fsAsync.exists(configAbsolutePath);
    if (!doesTheConfigFileExist) {
        errorAndExit("There is no file at '" + configFileRelativePath + "', which translates to absolute path '" + configAbsolutePath + "'.");
    }

    const stats = await fsAsync.statistics(configAbsolutePath);
    if (!stats.isFile()) {
        errorAndExit("The supplied config file path '" + configFileRelativePath + "' points to a directory instead of a file; it must point to a config file.");
    }

    async function update() {
        // Read config file.
        const configFile = await fsAsync.readFile(configAbsolutePath);
        const configFileContents = configFile.toString();
        // TODO: Remove comments

        // parse as json
        const configFileJSON: TSMonorepoConfig = JSON.parse(configFileContents);
        // TODO: validate that the structure matches via some json validating library

        // Validate the package root.
        if (configFileJSON.packageRoot.includes(".") || configFileJSON.packageRoot.includes("/") || configFileJSON.packageRoot.includes("\\")) {
            log.error(`The value of the config file's 'packageRoot' field '${configFileJSON.packageRoot}' does currently contains at least one of the forbidden characters '.', '/' or '\\'.`);
            return;
        }
        const packageRootAbsolutePath = path.resolve(".", configFileJSON.packageRoot);
        const packageRootExists = await fsAsync.exists(packageRootAbsolutePath);
        if (!packageRootExists) {
            log.error(`The value of the config file's 'packageRoot' field '${configFileJSON.packageRoot}' does not reference a real filesystem object.`);
            return;
        }
        const packageRootStats = await fsAsync.statistics(packageRootAbsolutePath);
        if (!packageRootStats.isDirectory()) {
            log.error(`The value of the config file's 'packageRoot' field '${configFileJSON.packageRoot}' does not reference a directory.`);
            return;
        }


        // Validate each package name
        var foundIssueWithAtLeastOnePackageName = false;
        for(const packageName in configFileJSON.packages) {
            const validationResult = validateNpmPackageName(packageName);
            if(!validationResult.validForNewPackages) {
                if (validationResult.errors && validationResult.errors.length) {
                    validationResult.errors.forEach(error => {
                        log.error(`in package name '${packageName}': ${error}`);
                    });
                }
                if (validationResult.warnings && validationResult.warnings.length) {
                    validationResult.warnings.forEach(warning => {
                        log.warn(`in package name '${packageName}': ${warning}`);
                    });
                }
                foundIssueWithAtLeastOnePackageName = true;
            }
        }
        if (foundIssueWithAtLeastOnePackageName) return;

        const lernaJSONPackagePaths = new Set<string>();

        // Sync each package name
        for (const packageName in configFileJSON.packages) {
            const nameParts = packageName.split("/");
            const nameIsScoped = nameParts.length === 2;
            var packageDirectoryAbsolutePath: string;
            if (nameIsScoped) {
                const scopedFolder = configFileJSON.packageRoot + "/" + nameParts[0];
                lernaJSONPackagePaths.add(scopedFolder + "/*");
                const scopedFolderAbsolutePath = path.resolve("./" + scopedFolder);
                const scopedFolderExists = await fsAsync.exists(scopedFolderAbsolutePath);
                if (scopedFolderExists) {
                    // Let's make sure it's a directory. If not we'll make sure it ends up that way.
                    const scopedFolderStats = await fsAsync.statistics(scopedFolderAbsolutePath);
                    if (scopedFolderStats.isFile()) {
                        log.warn(`Currently there is a file at ${scopedFolder}. It will be replaced with a folder as is stipulated by your config file's contents.`);
                        await fsAsync.deleteFile(scopedFolderAbsolutePath);
                        log.info(`Creating directory ${scopedFolder}`);
                        await fsAsync.makeDirectory(scopedFolderAbsolutePath);
                    }
                } else {
                    log.info(`Creating directory ${scopedFolder}`);
                    await fsAsync.makeDirectory(scopedFolderAbsolutePath);
                }
                packageDirectoryAbsolutePath = path.resolve(scopedFolderAbsolutePath, nameParts[1]);
            } else {
                lernaJSONPackagePaths.add(configFileJSON.packageRoot + "/*");
                packageDirectoryAbsolutePath = path.resolve("./" + configFileJSON.packageRoot, nameParts[0]);
            }
            await Promise.all([
                (async function syncPackageJSON() {

                    // Check if the current package.json if it exists. Write no matter what, but the preemptive read allows us to 
                    // notify the client if it was created for the first time.
                    const packageJSONExists = await fsAsync.exists(packageDirectoryAbsolutePath);
                    if (packageJSONExists) {
                        const packageJSONStats = await fsAsync.statistics(packageDirectoryAbsolutePath);
                        if (packageJSONStats.isDirectory()) {
                            log.warn(`Currently the package.json file for the package '${packageName}' is a folder. This will be deleted and replaced with a package.json file.`);
                            await recursivelyDeleteDirectoryAsync(packageDirectoryAbsolutePath);
                        } else {
                            // Already existed and 
                        }
                    }

                })(),
                (async function syncTSConfigJSON() {



                })()
            ]);
            

            // Do the same for tsconfig.json

            // 
        }
    }

    chokidar.watch(configAbsolutePath)
        .on("change", async _path => {
            console.log(ansicolor.white("Detected change in config file."));
            await update();
            console.log(ansicolor.green("Waiting for changes..."));
        })
        .on("add", async _path => {
            // has been added again, can begin listening.
            console.log(ansicolor.green("The config file has been added again."));
            await update();
            console.log(ansicolor.green("Waiting for changes..."));
        })
        .on("unlink", _path => {
            console.log(ansicolor.yellow("The config file has been removed.. Please add it again to resume watching."));
        })
        .on("error", error => {
            errorAndExit("Chokidar Error with name '" + error.name + "': " + error.message + (error.stack ? "\n" + ansicolor.default(error.stack) : ""));
        });
}

main();