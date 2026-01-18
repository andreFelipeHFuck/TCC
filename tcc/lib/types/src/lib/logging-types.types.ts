export enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
}

export abstract class Logger {
    abstract debug(message: string, context?: unknown): void;
    abstract info(message: string, context?: unknown): void;
    abstract warn(message: string, context?: unknown): void;
    abstract error(message: string, context?: unknown): void;
}

export interface LogEnv {
    production: boolean,
    logLevel: LogLevel
}