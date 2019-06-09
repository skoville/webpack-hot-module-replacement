import { CommandExecutor, Command, CommandPreExecutionSubscriber, CommandPostExecutionSubscriber } from "./command";
import { SelfResolvingConstruct } from "./self-resolving-construct";

type PayloadResultTuple = [any, any];
export type CommandTypes<T extends {[CommandIdentifier in keyof T]: PayloadResultTuple}> = {[CommandIdentifier in keyof T]: PayloadResultTuple};
type CommandPayload<T extends CommandTypes<T>, CommandIdentifier extends keyof T> = T[CommandIdentifier][0];
type CommandResult<T extends CommandTypes<T>, CommandIdentifier extends keyof T> = T[CommandIdentifier][1];
type CommandByTypes<T extends CommandTypes<T>, CommandIdentifier extends keyof T> = Command<CommandPayload<T, CommandIdentifier>, CommandResult<T, CommandIdentifier>>;

export type CommandExecutorImplementations<T extends CommandTypes<T>, CommandsToImplement extends (keyof T)[]> = {[C in CommandsToImplement[number]]: CommandExecutor<CommandPayload<T, C>, CommandResult<T, C>>};

export abstract class AbstractModule<T extends CommandTypes<T>, HandledCommands extends (keyof T)[], IssuableCommands extends (keyof T)[]> {
    // Contains resolvers for all the commands. This is necessary so each module has access to execute any command that it needs to.
    private readonly commandsPromise = new SelfResolvingConstruct<{[CommandIdentifier in keyof T]: CommandByTypes<T, CommandIdentifier>}>(
        undefined,
        `Detected attempt to register same module to multiple registries. A module instance may only belong to one registry instance.`
    );

    protected constructor(private readonly executors: CommandExecutorImplementations<T, HandledCommands>) {}

    protected async excuteCommand<CommandIdentifier extends IssuableCommands[number]>(commandId: CommandIdentifier,
        payload: CommandPayload<T, CommandIdentifier>) {
        // Is the below statement type-safe? Seems to be, but unsure because I can put any value into payload without trouble.
        return (await this.commandsPromise.value())[commandId].execute(payload);
    }

    protected async subscribePreExecutionMiddleware<CommandIdentifier extends keyof T>(commandIdentifier: CommandIdentifier,
        subsriber: CommandPreExecutionSubscriber<CommandPayload<T, CommandIdentifier>>) {
        return (await this.commandsPromise.value())[commandIdentifier].subscribePreExecutionMiddleware(subsriber);
    }

    protected async subscribePostExecutionMiddleware<CommandIdentifier extends keyof T>(commandIdentifier: CommandIdentifier,
        subscriber: CommandPostExecutionSubscriber<CommandPayload<T, CommandIdentifier>, CommandResult<T, CommandIdentifier>>) {
        return (await this.commandsPromise.value())[commandIdentifier].subscribePostExecutionMiddleware(subscriber);
    }

    public static readonly Registry = class Registry<T extends CommandTypes<T>> {
        // Unable to make the below instance variable private because of this:
        // https://github.com/Microsoft/TypeScript/issues/30355
        readonly commands: {[CommandIdentifier in keyof T]: CommandByTypes<T, CommandIdentifier>};

        protected constructor(modulesContainingExecutors: {[CommandIdentifier in keyof T]: AbstractModule<T, [CommandIdentifier], (keyof T)[]>}) {
            // The any here should be fine, because it doesn't matter what the handled commands or issuable commands are when gettting a set of modules to resolve the total command set for.
            const moduleSet = new Set<AbstractModule<T, any, (keyof T)[]>>();

            // We wouldn't need to use this any cast if there was a clean, type-safe way to map objects similarly to how we can map an array of one type to an array of another type.
            this.commands = {} as any;
            for(const commandIdentifier in modulesContainingExecutors) {
                const moduleContainingExecutors = modulesContainingExecutors[commandIdentifier];
                this.commands[commandIdentifier] = new Command(moduleContainingExecutors.executors[commandIdentifier]);
                // This is necessary because sometimes the same module handles the execution of more than one command,
                // so by adding to a set we end up with an iterable of unique modules (no repeats). We don't want repeats because
                // we don't want to double resolve the set of command executors within a module.
                moduleSet.add(moduleContainingExecutors)
            }
            // Now that the commands has been populated, we can pass this command mapping to the various modules for consumption.
            Array.from(moduleSet.values())
                .forEach(uniqueModule => {
                    uniqueModule.commandsPromise.resolve(this.commands);
                });
        }

        public subscribePreExecutionMiddleware<CommandIdentifier extends keyof T>(commandIdentifier: CommandIdentifier,
            subscriber: CommandPreExecutionSubscriber<CommandPayload<T, CommandIdentifier>>) {
            return this.commands[commandIdentifier].subscribePreExecutionMiddleware(subscriber);
        }

        public subscribePostExecutionMiddleware<CommandIdentifier extends keyof T>(commandIdentifier: CommandIdentifier,
            subscriber: CommandPostExecutionSubscriber<CommandPayload<T, CommandIdentifier>, CommandResult<T, CommandIdentifier>>) {
            return this.commands[commandIdentifier].subscribePostExecutionMiddleware(subscriber);
        }
    }
}