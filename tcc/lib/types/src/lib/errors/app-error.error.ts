export abstract class AppwriteError extends Error {
    constructor(
        message: string,
        public readonly type?: string,
        public readonly code?: string
    ){
        super(message);
    }
}