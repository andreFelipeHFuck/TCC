import { LogEnv } from "@tcc/types";

import { ConsoleLogger } from "./logger";

export function createLogger(env: LogEnv) {
    return new ConsoleLogger(env.logLevel);
}