export type Subscriber<T> = (publishedValue: T) => Promise<void>;
export class PubSub<T> {
    private readonly subscribers: Set<Subscriber<T>>;
    private readonly subscriberTypeName: string;
    public constructor(subscriberTypeName = "function") {
        this.subscribers = new Set();
        this.subscriberTypeName = subscriberTypeName;
    }
    public subscribe(subscriber: Subscriber<T>) {
        if(this.subscribers.has(subscriber)) {
            throw new Error(`Trying to subscribe a ${this.subscriberTypeName} that is already subscribed.`);
        }
        this.subscribers.add(subscriber);
        return () => {
            if (!this.subscribers.has(subscriber)) {
                throw new Error(`Trying to unsubscribe a ${this.subscriberTypeName} that is not subscribed.`);
            }
            this.subscribers.delete(subscriber);
        }
    }
    public async publish(value: T) {
        const runningSubscriberPromises = Array.from(this.subscribers.values())
            .map(async subscriber => await subscriber(value));
        await Promise.all(runningSubscriberPromises);
    }
}