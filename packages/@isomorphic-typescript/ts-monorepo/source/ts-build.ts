import * as child_process from 'child_process';
import { log } from './util/log';
export class TSBuild {
    private static TSC_BUILD_COMMAND = "tsc -b --project ./tsconfig-leaves.json --watch --verbose".split(" ");

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
        log.info("Starting tsc watching build");
        this.buildProcess = child_process.spawn("npx", TSBuild.TSC_BUILD_COMMAND);
        this.buildProcess.stdout.on("data", data => {
            console.log(data.toString());
        });
        this.buildProcess.stderr.on("data", data => {
            console.log(data.toString());
        });
        this.buildProcess.on("exit", () => {
            log.info("The tsc watching build has stopped.");
        });
    }

    public stop() {
        if (this.buildProcess === undefined) {
            log.error("Trying to stop the tsc watching build when it is already stopped");
            return;
        }
        this.buildProcess.kill();
    }
}