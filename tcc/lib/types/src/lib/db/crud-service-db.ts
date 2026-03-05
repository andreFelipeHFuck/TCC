export interface CrudServiceDB {
    get<T>(id: string): Promise<T>;
    create<T>(data: T): Promise<void>;
    // public abstract read(): Promise<void>;
    // public abstract update(): Promise<void>;
    // public abstract delete(): Promise<void>;
}
