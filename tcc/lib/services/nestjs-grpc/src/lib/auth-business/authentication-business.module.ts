import { Module, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthenticationBusiness } from '@tcc/models';
import { NestLoggerModule } from '@tcc/nest-logger';
import { RedisModule } from '@tcc/redis';

import { AuthBusinessController } from './authentication-business.controller';
import { AuthRpcGuard } from './authentication-business.guard';
import { AuthenticationBusinessService } from './authentication-business.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
     }),
    NestLoggerModule,
    RedisModule
  ],
  controllers: [AuthBusinessController],
  providers: [
    AuthRpcGuard,
    {
      provide: AuthenticationBusiness,
      useFactory: () => new AuthenticationBusiness(),
      scope: Scope.REQUEST,
    },
    AuthenticationBusinessService
  ],
  exports: [
    AuthRpcGuard, 
    AuthenticationBusiness,
    AuthenticationBusinessService
  ], 
})
export class AuthRpcModule {}
