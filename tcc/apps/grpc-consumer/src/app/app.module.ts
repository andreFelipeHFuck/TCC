import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthRpcModule } from '@tcc/nestjs-grpc';

@Module({
  imports: [AuthRpcModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
