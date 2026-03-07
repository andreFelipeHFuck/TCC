import * as dotenv from 'dotenv';
dotenv.config();

const endpoint = process.env['APPWRITE_ENDPOINT'] || '';
const project = process.env['APPWRITE_PROJECT_ID'] || '';
const apiKey = process.env['AUTH_INTEGRATION_API_KEY_TEST'] || '';

import { TestBed } from '@angular/core/testing';

import { Client, Users } from 'node-appwrite';

import { Appwrite } from '../appwrite';
import { APPWRITE_CONFIG } from '../appwrite-connections/appwrite-token';
import { Auth } from './auth';
import { Logger } from '@tcc/types';

describe('Auth Service - Integration Test', () => {
    let authService: Auth;

    // SDK Server Admin (para poder deletar as coisas)
    let adminUsers: Users;

    // Variável para guardar o ID do usuário criado e limpar depois
    let createdUserId: string | null = null;

    beforeAll(() => {
        // ---- 1. SETUP DO ANGULAR (CLIENT) ----
        // Aqui nós injetamos os provedores com dados do servidor de teste real
        TestBed.configureTestingModule({
            providers: [
                Auth,
                Appwrite,
                { provide: APPWRITE_CONFIG, useValue: { endpoint: endpoint, project: project } },
                { provide: Logger, useValue: { info: vi.fn(), error: vi.fn() } }
            ]
        });
        authService = TestBed.inject(Auth);

        // ---- 2. SETUP DO ADMIN (SERVER) ----
        const adminClient = new Client()
            .setEndpoint(endpoint)
            .setProject(project)
            .setKey(apiKey); // Chave super secreta do console

        adminUsers = new Users(adminClient);
    });

    // ---- 3. LIMPEZA DOS DADOS DO TESTE ----
    afterEach(async () => {
        // Se um usuário foi criado durante o teste, nós o deletamos agora!
        if (createdUserId) {
            try {
                await adminUsers.delete(createdUserId);
                createdUserId = null; // Reseta depois de apagar
            } catch (e) {
                console.error('[APPWRITE AUTH SERVICE INTEGRATION TESTE] Falha ao limpar o usuário do Appwrite', e);
            }
        }
    });

    it('deve se comunicar com o servidor real, criar um usuario e retornar seu ID', async () => {
        // Ação: Usa nosso wrapper de Cliente (Angular) para requisitar a criação no servidor
        const randomEmail = `usuario_teste_${Date.now()}@tcc.com`;
        const userResult = await authService.create('Usuario Teste', randomEmail, 'senhaForte123!');

        // Asserção: O SDK retornou um ID (sucesso da rede)
        expect(userResult.$id).toBeDefined();
        expect(userResult.email).toBe(randomEmail);

        // Salva o ID recém-criado para o block 'afterEach' fazer o Cleanup e Excluí-lo!
        createdUserId = userResult.$id;
    });
});
