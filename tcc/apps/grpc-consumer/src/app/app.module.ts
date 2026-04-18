import { Module } from '@nestjs/common';

import { AuthRpcModule } from '@tcc/nestjs-grpc';

import { NestjsMongodbModule } from '@tcc/nestjs-mongodb';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AuthRpcModule,
    NestjsMongodbModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
