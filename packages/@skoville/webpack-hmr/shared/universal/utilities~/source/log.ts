import * as ansicolor from 'ansicolor';

export namespace Log {
    // levels and their ranks are based off of Log4j
    export enum Level {
        ALL,
        TRACE,
        DEBUG,
        INFO,
        WARN,
        ERROR,
        FATAL,
        OFF
    }

    export interface Request {
        level: Level;
        contents: string;
    }

    type RequestHandler = (request: Request) => void;

    export class Logger {
        private readonly requestHandler: RequestHandler;
        private readonly permanentPrefix: string;
        private readonly permanentPlusInstancePrefix: string;
        private readonly level: Level;
        
        public constructor(requestHandler: RequestHandler, instancePrefix: string = "", permanentPrefix: string = "", level: number = Level.ALL) {
            this.requestHandler = requestHandler;
            this.permanentPrefix = permanentPrefix;
            this.permanentPlusInstancePrefix = permanentPrefix + instancePrefix;
            this.level = level;
        }

        private handle(level: Level, message: string) {
            if (level >= this.level) {
                const contents = this.permanentPlusInstancePrefix + this.prefixLinesOfMultilineMessage(message);
                this.requestHandler({level, contents});
            }
        }

        private prefixLinesOfMultilineMessage(message: string) {
            const barePrefix = ansicolor.strip(this.permanentPlusInstancePrefix);
            if (barePrefix.length > 0) {
                const messageLines = message.split("\n");
                if (messageLines.length > 1) {
                    const newLinePrefix = [];
                    for (var i = 0; i < barePrefix.length; ++i) {
                        newLinePrefix.push(i === barePrefix.length / 2 ? "." : " ");
                    }
                    return message.split("\n").join("\n" + ansicolor.white(newLinePrefix.join("")));
                }
            }
            // In this case either the prefix is 0 length or there is only one message line, so just return the message.
            return message;
        }

        public clone(newInstancePrefix?: string, level?: number) {
            return new Logger(this.requestHandler, newInstancePrefix, this.permanentPrefix, level);
        }

        // The logging methods.
        public trace(message: string) {
            this.handle(Level.TRACE, ansicolor.cyan(message));
        }
        public debug(message: string) {
            this.handle(Level.DEBUG, ansicolor.magenta(message));
        }
        public info(message: string) {
            this.handle(Level.INFO, message);
        }
        public warn(message: string) {
            this.handle(Level.WARN, ansicolor.yellow(message));
        }
        public error(message: string) {
            this.handle(Level.ERROR, ansicolor.red(message));
        }
        public fatal(message: string) {
            this.handle(Level.FATAL, ansicolor.bright.red(message));
        }
    }
}