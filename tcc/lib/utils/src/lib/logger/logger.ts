import { LogLevel, Logger} from '@tcc/types'

export class NoopLogger implements Logger {
    debug() {}
    info() {}
    warn() {}
    error() {}
}

export class ConsoleLogger implements Logger {
    constructor(private level: LogLevel) {}

    private canLog(level: LogLevel) {
        return level >= this.level;
    }

    debug(message: string, context?: unknown): void {
        if(this.canLog(LogLevel.DEBUG)) {
            console.debug(message, context);
        }
    }

    info(message: string, context?: unknown): void {
        if(this.canLog(LogLevel.INFO)) {
            console.debug(message, context);
        }
    }

    warn(message: string, context?: unknown): void {
        if(this.canLog(LogLevel.WARN)) {
            console.debug(message, context);
        }
    }

    error(message: string, context?: unknown): void {
        if(this.canLog(LogLevel.ERROR)) {
            console.debug(message, context);
        }
    }
}
