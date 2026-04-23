import { inject } from '@angular/core';
import {
  Logger,
  ConnectionServices,
  ApiRestError,
  RestServices
} from '@tcc/types';

const URL = 'http://localhost:3001/api';

export class ApiRest extends ConnectionServices<ApiRestError> {
    protected readonly logger = inject(Logger);

    protected readonly baseUrl = URL;

    protected readonly serviceName = RestServices.CONNECTION;

    constructor() {
        super();
        this.init();
    }

    async init(): Promise<void> {
        try {
            this.setReady();
            this.logger.info(`[${this.serviceName}] Conexão inicializada com sucesso em ${this.baseUrl}`);
        } catch (error) {

        }
    }
}
