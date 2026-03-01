export abstract class ConnectionServices<T> {

    protected status: 'ready' | 'error' = 'ready';
    protected lastError?: T;

    abstract init(): Promise<void>;

    isReady(): boolean {
        return this.status === 'ready';
    } 

    getError():  T| undefined {
        return this.lastError;
    }
}
