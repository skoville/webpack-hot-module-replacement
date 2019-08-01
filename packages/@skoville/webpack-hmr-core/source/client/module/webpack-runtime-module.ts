import { CompilerNotification} from '../../shared/server-client-notification-model';
import { Log } from '../../shared/log';
import { TOOL_NAME } from '../../shared/tool-name';
import { clientConfigurationOptions } from '../injected-client-constants/values';

import { ClientCommand } from './command-types';
import { AbstractClientModule } from './abstract-module';

export class WebpackRuntimeModule extends AbstractClientModule<[typeof ClientCommand.HandleMessage], [typeof ClientCommand.RestartApplication]> {

    private currentHash?: string;
    private readonly hotEnabled: boolean;
    private readonly restartingEnabled: boolean;
    private readonly hotSwappingRuntime?: WebpackHotSwapRuntime;

    public constructor() {
        super({
            [ClientCommand.HandleMessage]: message => this.handleMessage(message)
        }, "[SWP] ");
        const { enableHotModuleReloading, enableApplicationRestarting } = clientConfigurationOptions;
        this.hotEnabled = enableHotModuleReloading;
        this.restartingEnabled = enableApplicationRestarting;
        if (this.hotEnabled !== (module.hot !== undefined)) { // module.hot being defined should also mean that this.hotEnabled is true. Otherwise there was a logical error.
            throw new Error(`hot swapping is ${this.hotEnabled ? 'enabled' : 'disabled'}, but webpack's ${/*nameof.full(module.hot)*/ "module.hot"} is${module.hot === undefined ? ' not ' : ' '}defined.`);
        }
        if(module.hot !== undefined) {
            this.hotSwappingRuntime = new WebpackHotSwapRuntime(this, module.hot, this.log);
        }
    }

    public async startOrPromptAppRestart() {
        if(this.restartingEnabled) {
            this.log.info("Restarting...");
            await this.excuteCommand(ClientCommand.RestartApplication, undefined);
        } else {
            this.log.error("Manual Restart required.");
        }
    }

    public async handleMessage(message: CompilerNotification.Body) {
        switch(message.type) {
            case CompilerNotification.Type.NoChange:
                this.log.info('Nothing changed.');
                break;
            case CompilerNotification.Type.Recompiling:
                this.log.info('Source changed. Recompiling...');
                break;
            case CompilerNotification.Type.Update:
                const priorHashWasAbsent = this.currentHash === undefined;
                this.currentHash = message.data.hash;
                if(message.data.errors.length > 0) {
                    this.log.error('Errors while compiling. App Hot-Swap/Restart prevented.');
                    message.data.errors.forEach(errorMessage => {this.log.info(errorMessage)}); // should already have some ansi error coloring inside.
                } else {
                    if (message.data.warnings.length > 0) {
                        this.log.warn('Warnings while compiling.');
                        message.data.warnings.forEach(warningMessage => {this.log.info(warningMessage)}); // should already have some ansi warning coloring inside.
                    }
                    // TODO: Shouldn't this just logically run no matter what?
                    if(!priorHashWasAbsent) this.hotSwapOrRestart(); // There was already a previous hash loaded, so we should invoke the hot swap workflow.
                }
                break;
            // I don't currently have the server sending this for any reason.
            // It could be used by others trying to extend the functionality themselves.
            case CompilerNotification.Type.ForceRestart:
                this.log.info(`"${message.data.reason}". App Restarting...`);
                this.startOrPromptAppRestart();
                break;
        }
    }

    private hotSwapOrRestart() {
        this.log.info("App updated.");
        if(this.hotEnabled && this.hotSwappingRuntime) {
            this.log.info('Hot Swapping...');
            this.hotSwappingRuntime.hotSwap(this.currentHash);
        } else {
            this.startOrPromptAppRestart();
        }
    }

}

class WebpackHotSwapRuntime {
    private lastHash?: string;
    private readonly webpackRuntimeModule: WebpackRuntimeModule;
    private readonly hot: __WebpackModuleApi.Hot;
    private readonly log: Log.Logger;

    public constructor(clientRuntime: WebpackRuntimeModule, hot: __WebpackModuleApi.Hot, log: Log.Logger) {
        this.webpackRuntimeModule = clientRuntime;
        this.hot = hot;
        this.log = log.clone("[HMR] ");
        this.log.info("Waiting for update signal from SWP...");
    }

    public hotSwap(hash?: string) {
        this.lastHash = hash;
        if(!this.hashIsUpToDate()) {
            const hmrStatus = this.hot.status();
            switch(hmrStatus) {
                case "idle":
                    this.log.info("Checking for updates from the server...");
                    this.check();
                    break;
                case "abort":
                case "fail":
                    this.log.warn(`Cannot apply update as a previous update ${hmrStatus}ed. Need to do a full Restart!`);
                    this.webpackRuntimeModule.startOrPromptAppRestart();
                    break;
            }
        }
    }

    private hashIsUpToDate() {
        if (this.lastHash === undefined) return false;
        this.log.info(`${/*nameof.full(this.lastHash)*/"this.lastHash"} is '${this.lastHash}'. ${/*nameof(__webpack_hash__)*/"__webpack_hash__"} is '${__webpack_hash__}'`);
        return this.lastHash.indexOf(__webpack_hash__) !== -1; // TODO: shouldn't this just be an exact equality comparisson?
    }

    private async check() {
        try {
            // TODO: PR to hmr @types repo to include definition of module.hot.check that returns a promise so we don't have to use any
            const updatedModules: __WebpackModuleApi.ModuleId[] = await (this.hot as any).check(true);
            if(!updatedModules) {
                this.log.warn("Cannot find update. Need to do a full Restart!");
                this.log.warn(`(Probably because of restarting the ${TOOL_NAME} Webpack Server)`);
                this.webpackRuntimeModule.startOrPromptAppRestart();
                return;
            }
            if(!this.hashIsUpToDate()) this.check();
            this.logHMRApplyResult(updatedModules);
            if(this.hashIsUpToDate()) {
                this.log.info("App is up to date.");
            }
        } catch(err) {
            const hmrStatus = this.hot.status();
            switch(hmrStatus) {
                case "abort":
                case "fail":
                    this.log.warn(`Attempt to apply update has ${hmrStatus}ed. Need to do a full Restart!`);
                    break;
                default:
                    this.log.warn("Internal logic of HMR check has failed. Need to do a full Restart!");
            }
            if (err.message) this.log.error(err.message);
            if (err.stack) this.log.error(err.stack);
            await this.webpackRuntimeModule.startOrPromptAppRestart();
        }
    }

    private logHMRApplyResult(updatedModules: __WebpackModuleApi.ModuleId[]) {
        if(updatedModules.length === 0) {
            this.log.info("Nothing hot updated.");
        } else {
            this.log.info("Updated modules:");
            updatedModules.forEach(moduleId => {
                if(typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
                    const parts = moduleId.split("!");
                    this.log.info(" - " + parts.pop());
                }
                this.log.info(" - " + moduleId);
            });
            if(updatedModules.every(moduleId => typeof moduleId === "number")) {
                this.log.info("Consider using the NamedModulesPlugin for module names.");
            }
        }
    }

}