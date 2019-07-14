#!/usr/bin/env node
import * as yargs from 'yargs';
import { NodeBundleRunner, DownloadingNodeBundleRunner } from './bundle-runner';
import { log } from './logger';

export class CLI {
    public constructor() {
        this.buildYargs()
            .then(nodeBundleRunner => nodeBundleRunner.run())
            .catch((error: Error) => {
                this.printCLIError(error);
            });
    }

    private async buildYargs() {
        function coersionHandler(argumentName: string) {
            return (argument: any) => {
                if(Array.isArray(argument)) {
                    throw new Error(`No more than one ${argumentName} argument allowed`);
                }
                return argument;
            }
        }
        const {file, url} = yargs
            .option("file", {
                describe: 'Run bundle stored at specified file path',
                string: true,
                conflicts: 'url',
                coerce: coersionHandler
            })
            .option("url", {
                describe: 'Run bundle hosted at specified url',
                string: true,
                conflicts: 'file',
                coerce: coersionHandler
            })
            .example('$0 -f ./dist/server.js', '')
            .example('$0 --url=http://localhost:8080/server.js', '')
            .alias({
                f: 'file',
                u: 'url',
                h: 'help',
                v: 'version'
            })
            .group(['f', 'u'], 'Run Options:')
            .group(['h', 'v'], 'Help Options:')
            .strict()
            .help()
            .fail((message: string) => {
                throw new Error(message);
            })
            .argv;
        if (url !== undefined) {
            return new DownloadingNodeBundleRunner(url);
        } else if (file !== undefined) {
            return await NodeBundleRunner.createInstance(file);
        } else {
            throw new Error("One CLI argument is required");
        }
    }

    private printCLIError(error: Error) {
        log.fatal(error.message+ "\n");
        if (error.stack) {
            log.debug(error.stack);
        }
        yargs.showHelp();
        process.exit();
    }

}

new CLI();