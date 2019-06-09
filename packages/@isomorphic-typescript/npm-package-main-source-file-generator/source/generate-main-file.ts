#!/usr/bin/env node
import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';
import * as ansicolor from 'ansicolor';

// first element (index 0) is node, and second element (index 1) is generate-main-file
// console.log("process.argv = " + process.argv);

// First argument must be path to source directory
const sourceDirectoryRelativePath = process.argv[2];
// Second argument must be name of output file.
const nameOfGeneratedMainFile = process.argv[3];
// Third argument must be name of the root namespace
const nameOfRootNamespace = process.argv[4];

function printUsage() {
    console.log(
        "Usage:\n" +
        ansicolor.white("arguments[0]") + " relative path to source directory\n" +
        ansicolor.white("arguments[1]") + " name of output file (include the .ts postfix) to be placed under source directory\n" +
        ansicolor.white("arguments[2]") + " name of root namespace"
    );
}

function errorAndExit(message: string) {
    console.log(ansicolor.red(message) + "\n");
    printUsage();
    process.exit();
}

if (sourceDirectoryRelativePath === undefined || nameOfGeneratedMainFile === undefined) {
    errorAndExit("Error: one of the three args was undefined");
}

const fsAsync = {
    exists: util.promisify(fs.exists),
    statistics: util.promisify(fs.stat),
    readdir: util.promisify(fs.readdir),
    writeFile: util.promisify(fs.writeFile)
};

/**
 * Turns "hello-world-abc" to "HelloWorldAbc"
 */
function fromHyphenSeparatedSnakeCaseToPascalCase(input: string) {
    return input.split("-").map(word => {
        return (
            word[0].toLocaleUpperCase() +
            word.substring(1)
        );
    }).join("");
}

async function main() {
    const sourceDirectoryAbsolutePath = path.resolve("./", sourceDirectoryRelativePath);

    // Ensure the source directory actually exists.
    const exists = await fsAsync.exists(sourceDirectoryAbsolutePath);
    if (!exists) {
        errorAndExit("The supplied source directory " + sourceDirectoryRelativePath + " does not exist.");
    }

    // Ensure the output file does not contain slashes.
    if (nameOfGeneratedMainFile.indexOf("/") !== -1 || nameOfGeneratedMainFile.indexOf("\\") !== -1) {
        errorAndExit("The supplied output filename " + nameOfGeneratedMainFile + " may not contain forward or backward slashes");
    }
    
    // Ensure the root namespace name only contains letters and numbers, and there must be at least a length of 1 where the first character is a capital letter.
    if (!/^[A-Z][a-zA-Z0-9]*$/.test(nameOfRootNamespace)) {
        errorAndExit("The supplied root namespace " + nameOfRootNamespace + " must be alpha-numberic and begin with a capital letter");
    }

    // Scan the source directory, generating the source file as recursion happens
    const importLines: string[] = [];
    async function recurse(itemName: string, absolutePath: string, relativeStepsDownward: string[], linePrefix: string): Promise<string[]> {
        const stats = await fsAsync.statistics(absolutePath);
        const pascalCaseItemName = fromHyphenSeparatedSnakeCaseToPascalCase(itemName);
        if (stats.isDirectory()) {
            const children = await fsAsync.readdir(absolutePath);
            const linesOfChildren = (await Promise.all((children
                .map(childName => recurse(
                    childName,
                    path.resolve(absolutePath, childName),
                    [...relativeStepsDownward, childName],
                    linePrefix + "    "
                )))))
                .flat();
            return [
                linePrefix + "export namespace " + pascalCaseItemName + " {",
                ...linesOfChildren,
                linePrefix + "}"
            ];

        } else { // is a file.
            // Don't import the file we will be writing out to
            if (itemName === nameOfGeneratedMainFile && relativeStepsDownward.length === 1) {
                return [];
            }

            const importName = "Import" + importLines.length;
            importLines.push("import * as " + importName + " from './" + relativeStepsDownward.join("/").replace(/.ts$/, "") + "';");
            return [
                linePrefix + "export const " + pascalCaseItemName.split(".")[0] + " = " + importName + ';'
            ];
        }
    }
    const nestedNamespaceCodeLines = await recurse(nameOfRootNamespace, sourceDirectoryAbsolutePath, [], "");

    // Write out the final generated code.
    const finalGeneratedCode = [
        ...importLines,
        "",
        ...nestedNamespaceCodeLines
    ].join("\n");
    await fsAsync.writeFile(path.resolve(sourceDirectoryAbsolutePath, nameOfGeneratedMainFile), finalGeneratedCode);
}

main();