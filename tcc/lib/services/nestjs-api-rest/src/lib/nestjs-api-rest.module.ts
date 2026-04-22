import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { UserModule } from './users/users.module';
import { JwtAuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
  exports: [
    UserModule,
    AuthModule
  ],
})

export class NestjsApiRestModule {}
