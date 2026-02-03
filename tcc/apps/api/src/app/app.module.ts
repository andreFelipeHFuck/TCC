import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { OcppSocketModule } from '@tcc/ocpp-socket'

@Module({
  imports: [ OcppSocketModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
