import { Inject, Injectable } from "@nestjs/common";
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';


@Injectable()
export class RedisStoreService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    // Salvar sessão
    async saveSession(sessionId: string, userData: any, ttl?: number) {
        await this.cacheManager.set(`sess:${sessionId}`, userData, ttl);
    }

    // Buscar sessão (Get)
    async getSession<T>(sessionId: string): Promise<T | undefined> {
        return await this.cacheManager.get<T>(`sess:${sessionId}`);
    }

    // Encerrar sessão (Del)
    async invalidate(sessionId: string) {
        await this.cacheManager.del(`sess:${sessionId}`);
    }
}