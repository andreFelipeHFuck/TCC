import { TestBed } from '@angular/core/testing';
import { Appwrite } from './appwrite';
import {
  Logger,
  AppwriteServices,
  AppwriteConfig,
} from '@tcc/types';
import { APPWRITE_CONFIG } from './appwrite-connections/appwrite-token';

describe('Appwrite', () => {
  let service: Appwrite;
  let loggerMock: any;

  const mockConfig: AppwriteConfig = {
    endpoint: 'https://localhost/v1',
    project: 'test-project',
    databaseId: 'test-db',
  };

  beforeEach(() => {
    loggerMock = {
      info: vi.fn(),
      error: vi.fn(),
      warn: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        Appwrite,
        { provide: Logger, useValue: loggerMock },
        { provide: APPWRITE_CONFIG, useValue: mockConfig },
      ],
    });

    service = TestBed.inject(Appwrite);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('handleCall', () => {
    it('deve lançar erro se o cliente ou conta não estiverem inicializados', async () => {
      const promise = Promise.resolve('ok');

      // Por padrão client/account são 'NONE'
      await expect((service as any).handleCall(
        promise,
        AppwriteServices.DATABASE,
        'TestService',
        'Sucesso',
        'Erro'
      )).rejects.toBeDefined();

      expect(loggerMock.error).toHaveBeenCalledWith(
        expect.stringContaining('[TestService] Problema ao tentar acessar o serviço'),
        expect.anything()
      );
    });

    it('deve retornar o resultado da promise em caso de sucesso', async () => {
      // Simula o estado inicializado manipulando propriedades privadas
      (service as any).client = 'ALREADY_INITIALIZED_CLIENT' as any;
      (service as any).account = 'ALREADY_INITIALIZED_ACCOUNT' as any;

      const mockResult = { id: '123', status: 'success' };
      const promise = Promise.resolve(mockResult);

      const result = await (service as any).handleCall(
        promise,
        AppwriteServices.DATABASE,
        'TestService',
        'Sucesso',
        'Erro'
      );

      expect(result).toBe(mockResult);
      expect(loggerMock.info).toHaveBeenCalledWith(
        expect.stringContaining('[TestService] Sucesso')
      );
    });

    it('deve mapear e lançar erro se a promise falhar', async () => {
      (service as any).client = 'ALREADY_INITIALIZED_CLIENT' as any;
      (service as any).account = 'ALREADY_INITIALIZED_ACCOUNT' as any;

      const mockError = new Error('Appwrite API Error');
      const promise = Promise.reject(mockError);

      await expect((service as any).handleCall(
        promise,
        AppwriteServices.AUTH,
        'AuthService',
        'Login OK',
        'Login Fail'
      )).rejects.toBeDefined();

      expect(loggerMock.error).toHaveBeenCalledWith(
        expect.stringContaining('[AuthService] Login Fail'),
        expect.anything()
      );
    });

    it('não deve exibir notificação se o parâmetro silent for true', async () => {
      (service as any).client = 'ALREADY_INITIALIZED_CLIENT' as any;
      (service as any).account = 'ALREADY_INITIALIZED_ACCOUNT' as any;

      const mockError = new Error('Silent Error');
      const promise = Promise.reject(mockError);

      await expect((service as any).handleCall(
        promise,
        AppwriteServices.DATABASE,
        'TestService',
        'Sucesso',
        'Erro',
        true
      )).rejects.toBeDefined();
    });
  });
});
