export class SelfResolvingConstruct<T> {
    private static DEFAULT_DOUBLE_RESOLVE_ERROR_MESSAGE = "Trying to double resolve";

    private resolved: boolean;
    private readonly promise: Promise<T>;
    private readonly resolver: (value: T) => void;
    private readonly doubleResolveErrorMessage: string;

    public constructor(value?: T, doubleResolveErrorMessage?: string) {
        this.resolved = false;
        this.doubleResolveErrorMessage = doubleResolveErrorMessage || SelfResolvingConstruct.DEFAULT_DOUBLE_RESOLVE_ERROR_MESSAGE;

        // Hack code start.
        var resolver: any;
        this.promise = new Promise<T>(resolve => {
            resolver = resolve;
        });
        this.resolver = resolver;
        // Hack code end.

        if (value) {
            this.resolve(value);
        }
    }

    public async value() {
        return this.promise;
    }

    public resolve(value: T) {
        if (this.resolved) {
            throw new Error(this.doubleResolveErrorMessage);
        }
        this.resolved = true;
        this.resolver(value);
    }
}