/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { 
  MicroserviceOptions, 
  Transport 
} from '@nestjs/microservices'; 

import { AUTH_GRPC_CONFIG } from '@tcc/nestjs-grpc';

import { AppModule } from './app/app.module';

import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,  {
    transport: Transport.GRPC,
    options: {
      package: AUTH_GRPC_CONFIG.package,
      protoPath: join(__dirname, AUTH_GRPC_CONFIG.protoPath),
      url: '0.0.0.0:50051',
    },
  });

  await app.listen();
  Logger.log(`🚀 Application is running on: 0.0.0.0:50051`);
}

bootstrap();
