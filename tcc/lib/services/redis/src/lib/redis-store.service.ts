import { Inject, Injectable } from "@nestjs/common";
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class RedisStoreService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async saveSession(sessionId: string, userData: unknown, ttl?: number): Promise<boolean> {
        const firstStore = (this.cacheManager as unknown as { stores: unknown[] }).stores?.[0] || (this.cacheManager as unknown as { store: unknown }).store;
        const store = firstStore as unknown as { client?: { set: (key: string, value: string, options?: unknown) => Promise<string | null> } };
        const key = `sess:${sessionId}`;
        
        if (store && store.client) {
            const redisClient = store.client;
            
            const value = typeof userData === 'string' ? userData : JSON.stringify(userData);
            
            const options: { NX: boolean; PX?: number } = { NX: true };
            if (ttl) {
                options.PX = ttl;
            }

            const result = await redisClient.set(key, value, options);
            
            return result === 'OK';
        } else {
            const exists = await this.cacheManager.get(key);
            if (exists) {
                return false;
            }
            await this.cacheManager.set(key, userData, ttl);
            return true;
        }
    }

    async getSession<T>(sessionId: string): Promise<T | undefined> {
        return await this.cacheManager.get<T>(`sess:${sessionId}`);
    }

    async invalidate(sessionId: string) {
        await this.cacheManager.del(`sess:${sessionId}`);
    }
}