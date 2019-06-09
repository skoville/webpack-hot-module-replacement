import { PubSub } from "./pubsub";

type UnsubscribeFunction = () => void;
export type CommandPreExecutionSubscriber<Payload> = (payload: Payload) => Promise<void>;
type PostExecutionContext<Payload, Result> = {
    payload: Payload;
    result: Result;
};
export type CommandPostExecutionSubscriber<Payload, Result> = (context: PostExecutionContext<Payload, Result>) => Promise<void>;

export type CommandExecutor<Payload, Result> = (payload: Payload) => Promise<Result>;
export class Command<Payload, Result> {
    private readonly preExecutionSubscribers: PubSub<Payload>;
    private readonly postExecutionSubscribers: PubSub<PostExecutionContext<Payload, Result>>;
    private readonly executor: CommandExecutor<Payload, Result>;

    public constructor(executor: CommandExecutor<Payload, Result>) {
        this.preExecutionSubscribers = new PubSub("pre-execution subscriber");
        this.postExecutionSubscribers = new PubSub("post-execution subscriber");
        this.executor = executor;
    }

    public async execute(payload: Payload) {
        await this.preExecutionSubscribers.publish(payload);
        const result = await this.executor(payload);
        this.postExecutionSubscribers.publish({payload, result});
        return result;
    }

    public subscribePreExecutionMiddleware(preExecutionSubscriber: CommandPreExecutionSubscriber<Payload>): UnsubscribeFunction {
        return this.preExecutionSubscribers.subscribe(preExecutionSubscriber);
    }

    public subscribePostExecutionMiddleware(postExecutionSubscriber: CommandPostExecutionSubscriber<Payload, Result>): UnsubscribeFunction {
        return this.postExecutionSubscribers.subscribe(postExecutionSubscriber);
    }
}