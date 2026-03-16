import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CacheModule } from '@nestjs/cache-manager';

import { redisStore } from 'cache-manager-redis-yet';
import { RedisStoreService } from './redis-store.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          socket: {
            host: configService.get<string>('REDIS_HOST', 'localhost'),
            port: configService.get<number>('REDIS_PORT', 6379),
          },
          ttl: configService.get<number>('REDIS_TTL', 3600),
        })
      })
    })
  ],
  providers: [RedisStoreService],
  exports: [
    RedisStoreService, 
    CacheModule
  ],
})
export class RedisModule {}
