import * as dotenv from 'dotenv';
dotenv.config();

const endpoint = process.env['APPWRITE_ENDPOINT'] || '';
const project = process.env['APPWRITE_PROJECT_ID'] || '';
const apiKey = process.env['DATABASE_INTEGRATION_API_KEY_TEST'] || '';
const appwriteDatabaseId = process.env['APPWRITE_DATABASE_ID'] || '';

console.log(`Endpoint: ${endpoint}`);
console.log(`Project: ${project}`);
console.log(`API Key: ${apiKey}`);
console.log(`Appwrite Database ID: ${appwriteDatabaseId}`);

import { TestBed } from '@angular/core/testing';
import {
    Client as AdminClient,
    Databases as ServerDatabases,
    Query,
    ID
} from 'node-appwrite';

import { Logger, UserCreateDTO } from '@tcc/types';

import { Appwrite } from '../appwrite';
import {
    APPWRITE_CONFIG,
    APPWRITE_DATABASE_ID
} from '../appwrite-connections/appwrite-token';
import { DatabaseUser } from './database-user';
import { Database } from './database';

describe('DatabaseUser Service - Integration Test', () => {
    let databaseUserService: DatabaseUser;

    // SDK Server Admin (para consultar/remover do banco de teste via Node SDK)
    let adminDatabases: ServerDatabases;

    // ID do banco e coleção correspondentes ao servidor
    const COLLECTION_ID = 'users_id';

    let createdDocIds: string[] = [];

    const mockUser: UserCreateDTO = {
        name: '',
        email: 'test@example.com',
        password: 'password123',
        photo: 'https://example.com/photo.jpg',
        userType: 'driver',
        state: 'SP',
        city: 'São Paulo',
        neighborhood: 'Jardins',
        street: 'Rua Teste',
        cep: '12345678',
        streetNumber: 123
    };

    beforeAll(() => {
        // ---- 1. SETUP DO CLIENTE (ANGULAR / TESTBED) ----
        TestBed.configureTestingModule({
            providers: [
                DatabaseUser,
                Database,
                Appwrite,
                { provide: APPWRITE_CONFIG, useValue: { endpoint: endpoint, project: project } },
                { provide: APPWRITE_DATABASE_ID, useValue: appwriteDatabaseId },
                { provide: Logger, useValue: { info: vi.fn(), error: vi.fn() } }
            ]
        });
        databaseUserService = TestBed.inject(DatabaseUser);

        // ---- 2. SETUP DO ADMIN (SERVER DO APPWRITE) PARA LIMPEZA ----
        const adminClient = new AdminClient()
            .setEndpoint(endpoint)
            .setProject(project)
            .setKey(apiKey);

        adminDatabases = new ServerDatabases(adminClient);
    });

    afterEach(async () => {
        // Limpeza dos dados de testes (Cleanup)
        for (const docId of createdDocIds) {
            try {
                await adminDatabases.deleteDocument(appwriteDatabaseId, COLLECTION_ID, docId);
            } catch (e) {
                console.error('[DATABASE USER INTEGRATION TEST] Falha ao limpar o documento do Appwrite', e);
            }
        }
        createdDocIds = []; // reset
    });

    it('deve inserir um novo documento (create) no banco de dados com sucesso', async () => {

        const testName = `Teste User ${Date.now()}`;
        mockUser.name = testName;

        // Ação: usa o serviço do painel para criar
        try {
            await databaseUserService.create(mockUser);

        } catch (error: any) {
            console.log("CÓDIGO:", error.code); // Ex: 401, 403, 400
            console.log("MENSAGEM:", error.message);
            console.log("DETALHES:", error.response); // <--- ESTE É O MAIS IMPORTANTE
        }

        // Asserção: Procurar via SDK Server se ele foi realmente salvo no banco de dados Real
        const queryDocs = await adminDatabases.listDocuments(appwriteDatabaseId, COLLECTION_ID, [
            Query.equal('name', testName)
        ]);

        expect(queryDocs.total).toBeGreaterThan(0);
        expect(queryDocs.documents[0]['name']).toBe(testName);

        // Armazenar ID recém-criado para limpar no AfterEach
        createdDocIds.push(queryDocs.documents[0].$id);
    });

    it('deve retornar um documento persistido no Appwrite via get()', async () => {
        const testName = `Teste User ${Date.now()}`;
        mockUser.name = testName;

        // Setup: Primeiro salvamos algo artificialmente pelo admin sdk (server) com id fixo
        const tempId = ID.unique();
        await adminDatabases.createDocument(
            appwriteDatabaseId,
            COLLECTION_ID,
            tempId,
            mockUser
        );
        createdDocIds.push(tempId); // Adiciona na lista de exclusão para limpeza final

        // Ação: Chama o método real da classe DatabaseUser que fará a requisição pro Appwrite
        const recoveredUserData = await databaseUserService.get(tempId);

        // Asserção
        expect(recoveredUserData).toBeTruthy();
        expect((recoveredUserData as any).name).toBe(testName);
    });
});
