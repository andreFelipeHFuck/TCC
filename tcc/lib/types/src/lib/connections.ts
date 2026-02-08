export abstract class ConnectionServices<T> {

    protected status: 'ready' | 'error' = 'ready';
    protected lastError?: T;

    abstract isReady(): boolean;

    getError():  T| undefined {
        return this.lastError;
    }
}
