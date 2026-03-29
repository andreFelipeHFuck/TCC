import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { OcppSocketModule } from '@tcc/ocpp-socket'
import { AuthRpcModule } from '@tcc/nestjs-grpc'

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    OcppSocketModule, 
    AuthRpcModule
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    OcppSocketModule
  ],
})
export class AppModule {}
