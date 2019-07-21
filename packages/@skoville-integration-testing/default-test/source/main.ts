import * as chokidar from 'chokidar';
import { restartProgram } from './restart-program';
import * as ansicolor from 'ansicolor';

console.log();
console.log("------------------------------");
console.log(process.execArgv);
console.log(process.argv);
console.log("PID = " + process.pid);

try {
    require('./isomorphic-bundle-test');
} catch(e) {
    console.log(e);
    console.log("\n" + ansicolor.yellow("Waiting for code change..."));
}

chokidar.watch(__filename)
    .on("change", () => {
        restartProgram(() => {
            console.log("detected change in program itself");
        });
    });