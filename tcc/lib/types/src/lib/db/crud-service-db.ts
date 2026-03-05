export abstract class CrudServiceDB {
    public abstract get<T>(id: string): Promise<T>;
    public abstract create<T>(data: T): Promise<void>;
    // public abstract read(): Promise<void>;
    // public abstract update(): Promise<void>;
    // public abstract delete(): Promise<void>;
}
