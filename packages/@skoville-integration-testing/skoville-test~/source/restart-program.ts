var restarting = false;
export function restartProgram(idempotentPreRestartFn?: Function) {
    if (restarting) return;
    restarting = true;
    if (idempotentPreRestartFn) idempotentPreRestartFn();
    console.log("\nRestarting process...");
    setTimeout(() => {
        process.on("exit", function () {
            require("child_process").spawn(process.argv.shift(), [...process.execArgv, ...process.argv], {
                cwd: process.cwd(),
                detached : true,
                stdio: "inherit"
            })
        });
        process.exit();
    }, 20);
}