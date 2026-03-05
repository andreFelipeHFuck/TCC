export abstract class ConnectionServices<T> {

    private status: 'ready' | 'error' = 'ready';
    private lastError?: T;

    abstract init(): Promise<void>;

    setError(error: T): void {
        this.status = 'error';
        this.lastError = error;
    }

    setReady(): void {
        this.status = 'ready';
        this.lastError = undefined;
    }

    isReady(): boolean {
        return this.status === 'ready';
    }

    getError(): T | undefined {
        return this.lastError;
    }

    getStatus(): 'ready' | 'error' {
        return this.status;
    }
}
