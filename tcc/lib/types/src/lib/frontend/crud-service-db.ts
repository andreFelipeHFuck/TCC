export interface CrudServiceDB<TCreateReturn = any> {
    get<T>(id: string): Promise<T>;
    create<T>(data: T): Promise<TCreateReturn>;
    // public abstract read(): Promise<void>;
    // public abstract update(): Promise<void>;
    // public abstract delete(): Promise<void>;
}
