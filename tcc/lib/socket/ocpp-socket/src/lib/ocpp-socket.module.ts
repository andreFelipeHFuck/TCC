import { Module } from '@nestjs/common';
import { OcppGateway } from './ocpp-socket.gateway';

@Module({
  controllers: [],
  providers: [OcppGateway],
  exports: [OcppGateway],
})
export class OcppSocketModule {}
