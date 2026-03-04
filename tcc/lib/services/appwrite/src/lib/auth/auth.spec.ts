
import { TestBed } from '@angular/core/testing';
import { ID } from 'appwrite';

import { Auth } from './auth';
import { Appwrite } from '../appwrite';
import { Logger } from '@tcc/types';

describe('Auth Service', () => {
  let service: Auth;

  // Nossos mocks para substituir as dependências reais na injeção do Angular
  let appwriteMock: any;
  let loggerMock: any;
  let accountMock: any;

  beforeEach(() => {
    // 1. Mockamos o objeto Account do Appwrite e sua Promise
    accountMock = {
      create: vi.fn().mockResolvedValue({
        $id: 'user_123',
        name: 'Andre',
        email: 'test@test.com'
      })
    };

    // 2. Mockamos o wrapper Appwrite do seu TCC
    appwriteMock = {
      init: vi.fn().mockResolvedValue(true),
      isReady: vi.fn().mockReturnValue(true),
      getAccount: vi.fn().mockReturnValue(accountMock)
    };

    // 3. Mock do Logger para não sujar o terminal do teste
    loggerMock = {
      info: vi.fn(),
      error: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        Auth,
        { provide: Appwrite, useValue: appwriteMock },
        { provide: Logger, useValue: loggerMock }
      ]
    });

    // Mockamos a geração de ID única para garantir a previsibilidade no teste
    vi.spyOn(ID, 'unique').mockReturnValue('mock-id-unique');

    service = TestBed.inject(Auth);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('deve ser criado com sucesso', () => {
    expect(service).toBeTruthy();
  });

  describe('create()', () => {
    it('deve criar uma conta com os parâmetros corretos', async () => {
      const user = await service.create('Andre', 'test@test.com', 'senha123');

      // Verificamos se lá no ID do appwrite ele usou o ID.unique() corretamente (que mockamos)
      expect(accountMock.create).toHaveBeenCalledWith(
        'mock-id-unique',
        'test@test.com',
        'senha123',
        'Andre'
      );

      // Verificamos se const user obteve o mock
      expect(user.$id).toBe('user_123');
      expect(loggerMock.info).toHaveBeenCalledWith('[Auth] Conta criada com sucesso: user_123');
    });

    it('deve dar erro caso a conta for NONE', async () => {
      // Força a condição de erro acessando a propriedade pela injeção ou coerção
      (service as any).account = 'NONE';

      await expect(service.create('Andre', 't@t.com', '123'))
        .rejects
        .toThrow('Serviço do Appwrite não está inicializado.');
    });

    it('deve logar erro caso ocorra falha no appwrite', async () => {
      const error = new Error('Email já em uso');
      accountMock.create.mockRejectedValue(error);

      await expect(service.create('Andre', 't@t.com', '123'))
        .rejects
        .toThrow('Email já em uso');

      expect(loggerMock.error).toHaveBeenCalledWith('[Auth] Erro ao criar conta', { error });
    });
  });
});
