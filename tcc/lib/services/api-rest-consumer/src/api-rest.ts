import { inject } from '@angular/core';

import {
  Logger,
  ConnectionServices,
  ApiRestError,
  RestServices
} from '@tcc/types';
import { apiRestMapperError } from '@tcc/api-rest-adapter';

const URL = 'http://localhost:3001/api';

export class ApiRest extends ConnectionServices<ApiRestError> {
    protected readonly logger = inject(Logger);

    protected readonly baseUrl = URL;

    protected service = RestServices.CONNECTION;

    constructor() {
        super();
        this.init();
    }

    async init(): Promise<void> {
        try {
            await this.checkConnection();
            this.setReady();
            this.logger.info(`[${this.service}] Conexão inicializada com sucesso em ${this.baseUrl}`);
        } catch (error) {
            this.setError(apiRestMapperError(this.service, error));

            this.logger.error(`[${this.service.valueOf()}] Erro ao inicializar`, {
                error,
                mappedError: this.getError()
            });
        }
    }

    /**
     * Verifica se a API está online realizando uma requisição base.
     */
    private async checkConnection(): Promise<void> {
        try {
            // Um simples fetch para validar se a API responde
            const response = await fetch(this.baseUrl);
            
            if (!response.ok && response.status !== 404 && response.status !== 401) {
                // Caso a API retorne um erro do servidor ou semelhante, consideramos que falhou
                throw new Error(`Na verificação a API retornou falha. Status HTTP: ${response.status}`);
            }
        } catch (error) {
            this.logger.error(`[${this.service.valueOf()}] Erro no teste de conexão com a API:`, { error });
            throw new Error('Falha de conexão com a API REST. Servidor pode estar offline.');
        }
    }

    /**
     * Método que trata os erros que podem ocorrer durante a execução de uma chamada na Api Rest
     * 
     * @param call Função ou Promise que será executada
     * @param serviceId Serviço que será executado
     * @param successMessage Mensagem de sucesso
     * @param errorMessage Mensagem de erro
     * @param silent Flag que indica se o erro deve ser exibido
     * @returns O resultado da execução
     */
    public async handleCall<T>(
        call: () => Promise<T>,
        serviceId: RestServices,
        successMessage: string,
        errorMessage: string,
        silent = false
    ): Promise<T> {
        if (!this.isReady()) {
            this.logger.error(`[${serviceId.valueOf()}] Problema ao tentar acessar o serviço (conexão não está pronta)`, this.getError());

            this.setError(apiRestMapperError(
                RestServices.CONNECTION,
                new Error('Conexão da API REST não está pronta')
            ));

            throw this.getError();
        }

        try {
            const result = await call();
            this.logger.info(`[${serviceId.valueOf()}] ${successMessage}`);
            return result;
        } catch (error) {
            this.setError(apiRestMapperError(serviceId, error));
            this.logger.error(`[${serviceId.valueOf()}] ${errorMessage}`, {
                error,
                mappedError: this.getError()
            });

            if (!silent) {
                // this.notifier.showError(translatedError.message);
            }

            throw this.getError();
        }
    }
}
