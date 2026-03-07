import { Module } from '@nestjs/common';
import { AuthBusinessController } from './authentication-business.controller';
import { AuthRpcGuard } from './authentication-business.guard';

import { NestLoggerModule } from '@tcc/nest-logger';

@Module({
  imports: [NestLoggerModule],
  controllers: [AuthBusinessController],
  providers: [AuthRpcGuard],
  exports: [AuthRpcGuard], 
})
export class AuthRpcModule {}
