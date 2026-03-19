import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { RedisStoreService } from './redis-store.service';

describe('RedisStoreService', () => {
    let service: RedisStoreService;
    let cacheManagerMock: { stores: any[]; get: jest.Mock; set: jest.Mock; del: jest.Mock };
    let redisClientMock: { set: jest.Mock };

    beforeEach(async () => {
        redisClientMock = {
            set: jest.fn(),
        };

        cacheManagerMock = {
            stores: [
                {
                    client: redisClientMock,
                }
            ],
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RedisStoreService,
                {
                    provide: CACHE_MANAGER,
                    useValue: cacheManagerMock,
                },
            ],
        }).compile();

        service = module.get<RedisStoreService>(RedisStoreService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('saveSession (Caminho Atômico com Redis Client)', () => {
        it('deve retornar true se a sessão for salva com sucesso (cliente retorna OK)', async () => {
            const sessionId = '123';
            const userData = { user: 'test' };
            
            redisClientMock.set.mockResolvedValue('OK');

            const result = await service.saveSession(sessionId, userData);

            expect(redisClientMock.set).toHaveBeenCalledWith(
                `sess:${sessionId}`,
                JSON.stringify(userData),
                { NX: true }
            );
            expect(result).toBe(true);
        });

        it('deve retornar false se a chave já existir (cliente retorna null da opção NX)', async () => {
            const sessionId = '123';
            const userData = { user: 'test' };
            
            redisClientMock.set.mockResolvedValue(null);

            const result = await service.saveSession(sessionId, userData);

            expect(redisClientMock.set).toHaveBeenCalledWith(
                `sess:${sessionId}`,
                JSON.stringify(userData),
                { NX: true }
            );
            expect(result).toBe(false);
        });

        it('deve enviar argumento PX se for passado um ttl (Time to Live)', async () => {
            const sessionId = '123';
            const userData = 'some-string';
            const ttl = 1000;
            
            redisClientMock.set.mockResolvedValue('OK');

            const result = await service.saveSession(sessionId, userData, ttl);

            expect(redisClientMock.set).toHaveBeenCalledWith(
                `sess:${sessionId}`,
                'some-string',
                { NX: true, PX: ttl }
            );
            expect(result).toBe(true);
        });
    });

    describe('saveSession (Caminho de Fallback / In-Memory)', () => {
        beforeEach(() => {
            // Remove o client nativo do store temporariamente para cair no Else() do código
            cacheManagerMock.stores = [{}];
        });

        it('deve retornar true após salvar quando a chave NÃO existir', async () => {
            const sessionId = 'fallback-123';
            const userData = { test: true };

            cacheManagerMock.get.mockResolvedValue(null); // chave n existe

            const result = await service.saveSession(sessionId, userData);

            // Confirma que ele leu antes (simulando a atomicidade com check-then-set manual)
            expect(cacheManagerMock.get).toHaveBeenCalledWith(`sess:${sessionId}`);
            expect(cacheManagerMock.set).toHaveBeenCalledWith(`sess:${sessionId}`, userData, undefined);
            expect(result).toBe(true);
        });

        it('deve retornar false e abortar se a chave JÁ EXISTIR no fallback', async () => {
            const sessionId = 'fallback-123';
            const userData = { test: true };

            cacheManagerMock.get.mockResolvedValue({ already: 'exists' }); // chave existe

            const result = await service.saveSession(sessionId, userData);

            expect(cacheManagerMock.get).toHaveBeenCalledWith(`sess:${sessionId}`);
            expect(cacheManagerMock.set).not.toHaveBeenCalled(); // Não subescrever
            expect(result).toBe(false);
        });
    });

    describe('getSession e invalidate', () => {
        it('deve formatar corretamente as chaves no cacheManager.get', async () => {
            const sessionId = 'get-123';
            cacheManagerMock.get.mockResolvedValue({ id: sessionId });

            const result = await service.getSession(sessionId);

            expect(cacheManagerMock.get).toHaveBeenCalledWith(`sess:${sessionId}`);
            expect(result).toEqual({ id: sessionId });
        });

        it('deve deletar corretamente as chaves no cacheManager.del', async () => {
            const sessionId = 'get-123';
            await service.invalidate(sessionId);
            expect(cacheManagerMock.del).toHaveBeenCalledWith(`sess:${sessionId}`);
        });
    });
});
