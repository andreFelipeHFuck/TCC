import { 
  Logger, 
  ValidationPipe 
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { 
  MicroserviceOptions, 
  Transport 
} from '@nestjs/microservices'; 

import { AUTH_GRPC_CONFIG } from '@tcc/nestjs-grpc';

import { AppModule } from './app/app.module';

import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Permite qualquer origem (Cuidado: apenas para desenvolvimento!)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }); 
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: AUTH_GRPC_CONFIG.package,
      protoPath: join(__dirname, AUTH_GRPC_CONFIG.protoPath),
      url: '0.0.0.0:50051',
    },
  });

  app.setGlobalPrefix('api');

  const restPort = 3001; 
  await app.listen(restPort);
  Logger.log(`🚀 gRPC Microservice is running on: 0.0.0.0:50051`);
  Logger.log(`🚀 REST API is running on: http://localhost:${restPort}/api`);
}

bootstrap(); 
