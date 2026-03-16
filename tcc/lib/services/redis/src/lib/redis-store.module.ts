import { Module } from '@nestjs/common';
import { 
  ConfigModule, 
  ConfigService 
} from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

import { RedisStoreService } from './redis-store.service';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule], 
      inject: [ConfigService], 
      useFactory: async (configService: ConfigService) => {
        return {
          store: await redisStore({
            socket: {
              host: configService.get<string>('REDIS_HOST', 'localhost'),
              port: configService.get<number>('REDIS_PORT', 6379),
            },
            ttl: configService.get<number>('SESSION_TTL', 3600),
          }),
        };
      },
    }),
  ],
  providers: [RedisStoreService],
  exports: [
    RedisStoreService, 
    CacheModule
  ],
})
export class RedisModule {}
