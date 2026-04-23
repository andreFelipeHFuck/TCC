export abstract class AppwriteError extends Error {
    constructor(
        message: string,
        public readonly type?: string,
        public readonly code?: string,
    ){
        super(message);
    }
}

export abstract class ApiRestError extends Error {
    constructor(
        message: string,
        public readonly code?: string
    ){
        super(message);
    }
}

export interface jsonMensage {
    readonly type?: string,
    readonly code?: string,
    readonly errors?: object[]
}

export abstract class BigQueryError extends Error {
    constructor(
        message: string,
        public readonly jsonMensage?: jsonMensage
    ){
        super(message);
    }
}
