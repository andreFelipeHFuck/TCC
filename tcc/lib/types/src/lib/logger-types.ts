export enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
}

export abstract class Logger {
    debug(message: string, context?: unknown): void { console.debug(`[BIG QUERY] ${message}`, context) }
    info(message: string, context?: unknown): void { console.info(`[BIG QUERY] ${message}`, context) }
    warn(message: string, context?: unknown): void { console.warn(`[BIG QUERY] ${message}`, context) }
    error(message: string, context?: unknown): void { console.error(`[BIG QUERY] ${message}`, context) }
}

export class LoggerBigQuery {
    debug(message: string, context?: unknown): void { console.debug(`[BIG QUERY] ${message}`, context) }
    info(message: string, context?: unknown): void { console.info(`[BIG QUERY] ${message}`, context) }
    warn(message: string, context?: unknown): void { console.warn(`[BIG QUERY] ${message}`, context) }
    error(message: string, context?: unknown): void { console.error(`[BIG QUERY] ${message}`, context) }
}

export interface LogEnv {
    production: boolean,
    logLevel: LogLevel
}
