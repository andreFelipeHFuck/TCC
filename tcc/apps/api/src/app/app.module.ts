import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RedisModule } from '@tcc/redis';
import { OcppSocketModule } from '@tcc/ocpp-socket'

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
     }),
     RedisModule,
     OcppSocketModule 
    ],
  controllers: [AppController],
  providers: [AppService, OcppSocketModule],
})
export class AppModule {}
