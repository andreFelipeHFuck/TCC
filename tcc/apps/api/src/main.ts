import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { 
  MicroserviceOptions, 
  Transport 
} from '@nestjs/microservices';
import { AppModule } from './app/app.module';

import { IoAdapter } from '@nestjs/platform-socket.io';
import { AUTH_GRPC_CONFIG } from '@tcc/nestjs-grpc'
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure WebSocker
  app.useWebSocketAdapter(new IoAdapter(app));

  // Configure gRPC microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: AUTH_GRPC_CONFIG.package,
      protoPath: join(__dirname, AUTH_GRPC_CONFIG.protoPath),
      url: '0.0.0.0:50051',
    },
  });

  // Cofigure a global CORS
  app.enableCors();

  // const globalPrefix = 'api';
  // app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  
  await app.startAllMicroservices();
  await app.listen(port);
  
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/`,
  );
  Logger.log(`🚀 gRPC Microservice is running on: 0.0.0.0:50051`);
}

bootstrap();
