/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices'; 
import { AppModule } from './app/app.module';

import { AUTH_GRPC_CONFIG } from '@tcc/nestjs-grpc';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,  {
    transport: Transport.GRPC,
    options: {
      ...AUTH_GRPC_CONFIG,
      url: '0.0.0.0:50051',
    },
  });

  await app.listen();
  Logger.log(`🚀 Application is running on: 0.0.0.0:50051`);
}

bootstrap();
