import { Provider } from "@angular/core";

import { Logger, LogLevel } from "@tcc/types";
import { ConsoleLogger } from "@tcc/utils";

export const LOGGER_PROVIDER: Provider = {
  provide: Logger,
  useFactory: () => new ConsoleLogger(LogLevel.INFO),
}