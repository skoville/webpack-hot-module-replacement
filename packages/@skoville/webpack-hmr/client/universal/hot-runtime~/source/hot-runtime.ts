import { Log, UpdateResponse, UpdateRequest, CompilerUpdate, webpackFunctionToInjectName } from '@skoville/webpack-hmr-shared-universal-utilities';
import { clientOptions, webpackConfigurationName } from '@skoville/webpack-hmr-shared-universal-utilities/build/injected-client-constants/values';
import { ansicolor } from 'ansicolor';

export class SkovilleHotClientRuntime {
    private readonly log: Log.Logger
    private readonly hotEnabled: boolean;
    private readonly restartingEnabled: boolean;
    private cliendId: string | undefined = undefined;
    private readonly hashHistory: string[] = [__webpack_hash__];
    private currentHashHistoryIndex = 0;
    private readonly hashToCompilerUpdateMap: Map<string, CompilerUpdate> = new Map();
    private runningHotSwaps = 0;

    public constructor(
        log: Log.Logger,
        private readonly requestUpdatesFromServer: (updateRequest: UpdateRequest) => Promise<UpdateResponse>,
        private readonly restartClient: () => Promise<void>) {

        this.log = log.clone(`[${nameof(SkovilleHotClientRuntime)}] `);
        const { enableHotModuleReloading, enableApplicationRestarting } = clientOptions;
        this.hotEnabled = enableHotModuleReloading;
        this.restartingEnabled = enableApplicationRestarting;
        const moduleHotIsDefined = module.hot !== undefined;
        if (this.hotEnabled !== moduleHotIsDefined) { // module.hot being defined should also mean that this.hotEnabled is true. Otherwise there was a logical error.
            throw new Error(`hot swapping is ${this.hotEnabled ? 'enabled' : 'disabled'}, but webpack's ${nameof.full(module.hot)} is ${moduleHotIsDefined ? '' : 'un'}defined.`);
        }
    }

    public getClientId() {
        return this.cliendId;
    }

    private async startOrPromptAppRestart() {
        if(this.restartingEnabled) {
            this.log.info("Restarting...");
            await this.restartClient();
        } else {
            this.log.error("Manual Restart required.");
        }
    }

    public async triggerUpdateRequest() {
        const updateResponse = await this.requestUpdatesFromServer({
            webpackConfigurationName,
            currentHash: __webpack_hash__,
            clientId: this.cliendId
        });
        await this.handleUpdateResponseFromServer(updateResponse);
    }

    private async handleUpdateResponseFromServer(updateResponse: UpdateResponse) {
        this.log.info("update response is \n" + JSON.stringify(Object.assign({}, updateResponse,
            (
                updateResponse.webpackConfigurationNameRegistered &&
                updateResponse.compatible
            ) ?
            {
                [nameof(updateResponse.updatesToApply)]: updateResponse.updatesToApply.map(update => {
                    const {updatedSource, ...updateSummary} = update;
                    return updateSummary;
                })
            }
            :
            {}
        )));
        if(updateResponse.webpackConfigurationNameRegistered) {
            this.cliendId = updateResponse.clientId;
            if(updateResponse.compatible) {
                // Check length of updates. Find acutal diff between current and lastest server, then begin applying.
                const newlyQueuedUpdates = this.mergeUpdates(updateResponse.updatesToApply);
                if (newlyQueuedUpdates === null) {
                    this.log.error(`Failed to ${nameof(this.handleUpdateResponseFromServer)}`);
                    return;
                }
                const actualUpdateOcurred = newlyQueuedUpdates.length > 0;
                if (actualUpdateOcurred) {
                    this.log.info(`${newlyQueuedUpdates.length} newly queued updates from server.`);
                    if(this.hotEnabled) {
                        if (this.runningHotSwaps === 0) {
                            this.hotSwap();
                        } else if (this.runningHotSwaps > 1) {
                            throw Error(`Fatal error detected. ${nameof.full(this.runningHotSwaps)} > 1`);
                        }
                    } else {
                        this.log.info(`Restarting since hot swapping is disabled`);
                        this.startOrPromptAppRestart();
                    }
                }
            } else {
                this.log.error(`Current ${nameof(__webpack_hash__)} is ${__webpack_hash__}, which is incompatible with hash history stored on server. Likely the server restarted, resulting in a new hash history.`);
                this.startOrPromptAppRestart();
            }
        } else {
            this.log.error(`The ${nameof(webpackConfigurationName)} '${webpackConfigurationName}' is not registered in server running at ${clientOptions.url}`);
        }
    }

    /**
     * merges updates sent from the server into the queue of updates which need to be applied.
     * @param compilerUpdates the updates received from the server.
     * @returns the compiler updates which were not registered in the update queue before this run.
     */
    private mergeUpdates(compilerUpdates: CompilerUpdate[]): CompilerUpdate[] | null {
        this.log.info("webpack hash is = " + ansicolor.green(__webpack_hash__));
        var indexOfHashHistoryWhichMatchesIndexOfFirstUpdate = -1;
        for (var hashHistoryIndex = 0; hashHistoryIndex < this.hashHistory.length; ++hashHistoryIndex) {
            const currentHashFromHistory = this.hashHistory[hashHistoryIndex];
            if (compilerUpdates[0].hash === currentHashFromHistory) {
                indexOfHashHistoryWhichMatchesIndexOfFirstUpdate = hashHistoryIndex;
                break;
            }
        }
        if (indexOfHashHistoryWhichMatchesIndexOfFirstUpdate === -1) {
            this.log.error(`Recieved ${nameof(compilerUpdates)} which are not in sync with the hash here. This should have been caught by the server, and resulted in an a response with incompatible set to true. This means there is a bug present.`);
            this.log.error(`${nameof(compilerUpdates)} = ${ansicolor.default(JSON.stringify(compilerUpdates))}. Own ${nameof(this.hashHistory)} is ${ansicolor.default(JSON.stringify(this.hashHistory))}`);
            return null;
        } else {
            if (this.hashHistory.length === 1) {
                // In this case, it means the hot client has only just started, meaning
                // It has the initial hash in the history but is not yet aware of the update
                // which corresponds to that original hash yet. So we can set it explicitly.
                this.hashToCompilerUpdateMap.set(this.hashHistory[0], compilerUpdates[0]);
            }
            const newlyQueuedUpdates: CompilerUpdate[] = [];
            for (var indexOfUpdates = 0; indexOfUpdates < compilerUpdates.length; ++indexOfUpdates) {
                const currentUpdate = compilerUpdates[indexOfUpdates];
                const currentHashHistoryIndex = indexOfHashHistoryWhichMatchesIndexOfFirstUpdate + indexOfUpdates;
                const currentHash = this.hashHistory[currentHashHistoryIndex];
                if (currentHash === undefined) {
                    this.hashHistory[currentHashHistoryIndex] = currentUpdate.hash;
                    this.hashToCompilerUpdateMap.set(currentUpdate.hash, currentUpdate);
                    newlyQueuedUpdates.push(currentUpdate);
                } else {
                    if (newlyQueuedUpdates.length > 0) {
                        this.log.error(`Detected error where there is a hash which exists within the ${nameof.full(this.hashHistory)} when the ${nameof(newlyQueuedUpdates)} has been added to already. ${nameof.full(this.hashHistory)} = ${ansicolor.default(JSON.stringify(this.hashHistory))}`);
                        return null;
                    }
                    const previouslySavedUpdate = this.hashToCompilerUpdateMap.get(currentHash);
                    if (previouslySavedUpdate === undefined) {
                        this.log.error(`The ${nameof(currentHash)} is defined as '${currentHash}', however a mapping does not appear to exist in ${nameof.full(this.hashToCompilerUpdateMap)} which is currently equal to the entry set ${ansicolor.default(JSON.stringify(Array.from(this.hashToCompilerUpdateMap.entries())))}.`);
                        return null;
                    } else {
                        const previouslySavedUpdateJSON = JSON.stringify(previouslySavedUpdate);
                        const receivedUpdateJSON = JSON.stringify(currentUpdate);
                        if (previouslySavedUpdateJSON !== receivedUpdateJSON) {
                            this.log.error(`Detected error where the ${nameof(receivedUpdateJSON)} of '${ansicolor.default(receivedUpdateJSON)}' is not equal to the ${nameof(previouslySavedUpdateJSON)} of '${previouslySavedUpdateJSON}'.`);
                            return null;
                        }
                    }
                }
            }
            return newlyQueuedUpdates;
        }
    }

    private async hotSwap() {
        this.runningHotSwaps++;
        if (this.runningHotSwaps !== 1) {
            this.log.error(`Detected unexpected number of running ${nameof.full(this.hotSwap)}s. Current count is ${this.runningHotSwaps}`);
            return;
        }
        if (this.currentHashHistoryIndex >= this.hashHistory.length - 1) {
            this.log.error(`Hot swapping should not be occuring right now since ${nameof.full(this.currentHashHistoryIndex)} is ${this.currentHashHistoryIndex} while ${nameof.full(this.hashHistory.length)} is ${this.hashHistory.length}`);
            return;
        }
        const currentHash = this.hashHistory[this.currentHashHistoryIndex];
        if (__webpack_hash__ !== currentHash) {
            this.log.error(`When trying to run ${nameof(this.hotSwap)}, the value of ${nameof(__webpack_hash__)} is ${__webpack_hash__} whereas the value at ${nameof.full(this.currentHashHistoryIndex)} is ${currentHash}, likely indicating a prior hotswap failed.`);
            return;
        }
        const nextHashFromUpdateQueue = this.hashHistory[this.currentHashHistoryIndex + 1];
        const updateToApply = this.hashToCompilerUpdateMap.get(nextHashFromUpdateQueue);
        if (updateToApply === undefined) {
            this.log.error(`There was an invalid attempt to run ${nameof(this.hotSwap)}, because the ${nameof(updateToApply)} is undefined in ${nameof.full(this.hashToCompilerUpdateMap)} at hash ${nextHashFromUpdateQueue}`);
            return;
        }
        if (updateToApply.hash !== nextHashFromUpdateQueue) {
            this.log.error(`Detected error where the hash ${nextHashFromUpdateQueue} when used as an index into ${nameof.full(this.hashToCompilerUpdateMap)} returns an update which has a non-matching hash ${updateToApply.hash}`);
            return;
        }
        if (!module.hot) {
            this.log.error(`${nameof.full(module.hot)} is undefined when there is an attempt to run ${nameof(this.hotSwap)}`);
            return;
        }
        const currentHMRStatus = module.hot.status();
        if (currentHMRStatus !== "idle") {
            this.log.error(`There was an invalid attempt to run ${nameof(this.hotSwap)} when the ${nameof.full(module.hot.status)} is currently '${ansicolor.default(currentHMRStatus)}'`);
            return;
        }
        try {
            this.log.info(`Removing the following chunks:`);
            this.log.info(`['${updateToApply.manifest.removedChunkIds.join("', '")}']`);
            this.log.info(`Removing the following modules:`);
            this.log.info(`['${updateToApply.manifest.removedModuleIds.join("', '")}']`);
            this.log.info(`Replacing the following modules:`);
            for (const [chunkId, updatedModules] of Object.entries(updateToApply.updatedSource)) {
                this.log.info(`Chunk ${chunkId}: ['${Object.keys(updatedModules).map(updatedModuleId => ansicolor.magenta(updatedModuleId)).join("', '")}']`);
            }
            
            // TODO: PR to hmr @types repo to include new method added to module.hot
            const updatedModulesConfirmed = await (module.hot as any)[webpackFunctionToInjectName](updateToApply);
            this.logHMRApplyResult(updatedModulesConfirmed);

            this.currentHashHistoryIndex++;
            const currentHash = this.hashHistory[this.currentHashHistoryIndex];
            if (currentHash !== __webpack_hash__) {
                this.log.error(`After hot swap occured, we now have a current ${nameof(__webpack_hash__)} of ${__webpack_hash__}, however the value at ${nameof.full(this.currentHashHistoryIndex)} is ${currentHash}`);
                return;
            }

            this.runningHotSwaps--;
            if (this.currentHashHistoryIndex === this.hashHistory.length - 1) {
                this.log.info(`Client is up to date. ${nameof.full(this.hotSwap)} finished.`);
            } else {
                this.hotSwap();
            }
        } catch(err) {
            this.log.error(`${nameof.full(module.hot.apply)} has failed. The current ${nameof.full(module.hot.status)} is ${module.hot.status()}`);
            this.log.error("message below");
            this.log.error(err.message);
            this.log.error("stack below");
            this.log.error(err.stack);
            if (module.hot.status() === 'abort') {
                this.startOrPromptAppRestart();
            }
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
                    this.log.info(" - " + ansicolor.magenta("" + parts.pop()));
                }
                this.log.info(" - " + ansicolor.magenta("" + moduleId));
            });
            if(updatedModules.every(moduleId => typeof moduleId === "number")) {
                this.log.info("Consider using the NamedModulesPlugin for module names.");
            }
        }
    }
}