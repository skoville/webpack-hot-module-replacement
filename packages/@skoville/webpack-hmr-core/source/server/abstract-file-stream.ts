import { SelfResolvingConstruct } from "@isomorphic-typescript/modularly-architected-library-foundation";

type ChunkHolder = {
    chunk: string;
}

export abstract class AbstractFileStream {
    private finished = false;
    private readonly queuedChunkRequests: Set<SelfResolvingConstruct<string|undefined>>;
    private readonly queuedChunks: Set<ChunkHolder>;

    protected constructor() {
        this.queuedChunkRequests = new Set();
        this.queuedChunks = new Set();
    }

    public async getNextChunk() {
        if (this.queuedChunks.size > 0) {
            return this.dequeue(this.queuedChunks).chunk;
        }
        if (this.finished) {
            return undefined;
        }
        const chunkResolver = new SelfResolvingConstruct<string|undefined>();
        this.queuedChunkRequests.add(chunkResolver);
        return chunkResolver.value();
    }

    private dequeue<T>(set: Set<T>): T {
        if (set.size === 0) {
            throw new Error("Trying to dequeue from an empty set");
        }
        const value = set.values().next().value;
        set.delete(value);
        return value;
    }

    protected writeNextChunk(chunk: string) {
        if (this.finished) {
            throw new Error("Trying to write chunk after stream has already been finished");
        }
        if (this.queuedChunkRequests.size > 0) {
            const chunkRequest = this.dequeue(this.queuedChunkRequests);
            chunkRequest.resolve(chunk);
        } else {
            // We wrap chink in an object because we want identical chunks to remain as separate items in the set.
            this.queuedChunks.add({chunk});
        }
    }

    protected finish() {
        if (this.finished) {
            throw new Error("Trying to finish file stream twice");
        }
        this.finished = true;
        while (this.queuedChunkRequests.size > 0) {
            const chunkRequest = this.dequeue(this.queuedChunkRequests);
            chunkRequest.resolve(undefined);
        }
    }
}