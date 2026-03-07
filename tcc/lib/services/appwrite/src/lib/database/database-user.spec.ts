import { TestBed } from '@angular/core/testing';
import { ID } from 'appwrite';

import { DatabaseUser } from './database-user';
import { Database } from './database';

describe('DatabaseUser Service', () => {
  let service: DatabaseUser;

  // Nossos mocks
  let databaseServiceMock: any;
  let appwriteDatabaseMock: any;

  beforeEach(() => {
    // 1. Mockamos o objeto "Databases" (o SDK oficial do Appwrite) que sua função getDatabase() retorna
    appwriteDatabaseMock = {
      getDocument: vi.fn().mockResolvedValue({
        $id: 'user_123',
        name: 'Andre Silva',
        email: 'mock@tcc.com'
      }),
      createDocument: vi.fn().mockResolvedValue({
        $id: 'mock-id-unique'
      })
    };

    // 2. Mockamos nosso wrapper (o seu serviço "Database" do TCC)
    databaseServiceMock = {
      getDatabase: vi.fn().mockReturnValue(appwriteDatabaseMock),
      getDatabaseId: vi.fn().mockReturnValue('mock-database-id')
    };

    TestBed.configureTestingModule({
      providers: [
        DatabaseUser,
        { provide: Database, useValue: databaseServiceMock }
      ]
    });

    // 3. Forçamos o ID aleatório a ser rastreável no teste pra comparar depois
    vi.spyOn(ID, 'unique').mockReturnValue('mock-id-unique');

    service = TestBed.inject(DatabaseUser);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('deve ser inicializado corretamente', () => {
    expect(service).toBeTruthy();
  });

  describe('get()', () => {
    it('deve realizar a chamada getDocument com banco, collection e ID correto', async () => {
      // Ação: chama a função do SEU serviço
      const user = await service.get<{ $id: string }>('user_123');

      // Asserções: Verifica se os helpers internos foram chamados
      expect(databaseServiceMock.getDatabase).toHaveBeenCalled();
      expect(databaseServiceMock.getDatabaseId).toHaveBeenCalled();

      // Asserção CRÍTICA: Verifica as assinaturas que foram enviadas para o SDK do Appwrite
      expect(appwriteDatabaseMock.getDocument).toHaveBeenCalledWith(
        'mock-database-id', // ID do Banco injetado
        'users_id',         // ID da Collection (constante)
        'user_123'          // ID do documento passado na função
      );

      // Verifica o retorno que o mock devolveu
      expect(user).toEqual(expect.objectContaining({ $id: 'user_123' }));
    });
  });

  describe('create()', () => {
    it('deve formatar as informações e enviar via createDocument pro servidor', async () => {
      const novoUsuarioFake = { name: 'Andre Silva', type: 'admin' };

      // Ação
      await service.create(novoUsuarioFake);

      // Asserções paramétricas
      expect(appwriteDatabaseMock.createDocument).toHaveBeenCalledWith(
        'mock-database-id',
        'users_id',
        'mock-id-unique',   // O ID forçado pelo nosso Spy
        novoUsuarioFake
      );
    });
  });
});
