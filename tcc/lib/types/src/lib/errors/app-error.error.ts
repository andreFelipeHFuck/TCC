export abstract class AppWriteError extends Error {
    constructor(
        message: string,
        public readonly type?: string,
        public readonly code?: string
    ){
        super(message);
    }
}