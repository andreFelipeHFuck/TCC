import { Module, Global } from '@nestjs/common';

import { LogEnv, LogLevel } from '@tcc/types';
import { createLogger } from '@tcc/utils';

@Module({
  controllers: [],
  providers: [{
    provide: 'LOGGER_TOKEN',
    useFactory: () => {
      const level: LogEnv = {
        production: false,
        logLevel: LogLevel.DEBUG
      };
      return createLogger(level);
    }
  }],
  exports: ['LOGGER_TOKEN'],
})
export class NestLoggerModule {}
