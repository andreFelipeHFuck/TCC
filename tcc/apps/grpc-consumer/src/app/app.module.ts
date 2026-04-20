import { Module } from '@nestjs/common';

import { AuthRpcModule } from '@tcc/nestjs-grpc';


import { NestjsApiRestModule } from '@tcc/nestjs-api-rest';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AuthRpcModule,
    NestjsApiRestModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
