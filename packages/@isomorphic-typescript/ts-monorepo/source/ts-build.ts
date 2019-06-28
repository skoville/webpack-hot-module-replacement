import * as child_process from 'child_process';
import { log } from './util/log';
import ansicolor = require('ansicolor');
export class TSBuild {
    private static TSC_BUILD_COMMAND = "tsc -b --watch --verbose --preserveWatchOutput ./tsconfig-leaves.json";

    private buildProcess: child_process.ChildProcessWithoutNullStreams | undefined;

    public constructor() {}

    public isRunning() {
        return this.buildProcess !== undefined;
    }

    public start() {
        if (this.buildProcess !== undefined) {
            log.error("Trying to start the tsc watching build when process already running.");
            return;
        }
        log.info(`Running '${ansicolor.white(TSBuild.TSC_BUILD_COMMAND)}'`);
        const command = require('os').platform() === 'win32' ? "npx.cmd" : "npx";
        this.buildProcess = child_process.spawn(command, TSBuild.TSC_BUILD_COMMAND.split(" "));
        this.buildProcess.stdout.on("data", data => {
            console.log(data.toString());
        });
        this.buildProcess.stderr.on("data", data => {
            console.log(data.toString());
        });
        this.buildProcess.on("exit", () => {
            log.info(`The '${ansicolor.white(TSBuild.TSC_BUILD_COMMAND)}' command has stopped.`);
        });
    }

    public stop() {
        if (this.buildProcess === undefined) {
            log.error("Trying to stop the tsc watching build when it is already stopped");
            return;
        }
        this.buildProcess.kill();
        this.buildProcess = undefined;
    }
}