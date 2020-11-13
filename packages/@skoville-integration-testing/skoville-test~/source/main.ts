import * as chokidar from 'chokidar';
import { restartProgram } from './restart-program';
import * as ansicolor from 'ansicolor';
import * as path from 'path';

console.log();
console.log("------------------------------");
console.log("PID = " + process.pid);

try {
    require('./isomorphic-bundle-test');
} catch(e) {
    console.log(e);
    console.log("\n" + ansicolor.yellow("Waiting for code change..."));
}

const PATH_TO_WATCH = path.resolve(__dirname, '../save-to-trigger-restart.txt')
console.log("watching " + PATH_TO_WATCH)

chokidar.watch(PATH_TO_WATCH)
    .on("change", () => {
        restartProgram(() => {
            console.log("detected change in program itself");
        });
    });