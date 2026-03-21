import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { OcppSocketModule } from '@tcc/ocpp-socket'

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [OcppSocketModule],
  controllers: [AppController],
  providers: [
    AppService, 
    OcppSocketModule
  ],
})
export class AppModule {}
