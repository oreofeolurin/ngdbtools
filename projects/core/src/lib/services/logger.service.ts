export enum LogLevel {
    NONE,
    INFO,
    WARN,
    ERROR
}

export function LoggerFactory(isProd = true) {
    return () => {
        return new Logger(isProd ? LogLevel.NONE : LogLevel.ERROR);
    }
}

export class Logger {
    constructor(private readonly logLevel: LogLevel = LogLevel.ERROR) { }

    log(message: string): void {
        if (this.logLevel > LogLevel.INFO) { console.log(message); }
    }

    warn(message: string): void {
        if (this.logLevel > LogLevel.WARN) { console.warn(message); }
    }

    error(message: string): void {
        if (this.logLevel > LogLevel.ERROR) { console.error(message); }
    }
}
