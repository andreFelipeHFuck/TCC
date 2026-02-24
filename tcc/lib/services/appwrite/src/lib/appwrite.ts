import { inject, Injectable } from '@angular/core';

import {
  AppwriteAccount, 
  AppwriteClient, 
  AppwriteConfig, 
  AppwriteError, 
  ConnectionServices, 
  Logger, 
  UnauthorizedError
} from "@tcc/types";
import { appwriteMapperError } from '@tcc/appwrite-adapter';

import { APPWRITE_CONFIG } from './appwrite-connections/appwrite-token.token';
import { appwriteCreateConnection } from './appwrite-connections/appwrite-connections.utils';

@Injectable({
  providedIn: 'root',
})
export class Appwrite extends ConnectionServices<AppwriteError> {
  private readonly appwriteConfig: AppwriteConfig = inject(APPWRITE_CONFIG);
  private readonly logger = inject(Logger);

  private client: AppwriteClient = 'NONE';
  private account: AppwriteAccount = 'NONE';

  constructor(){
    super();
  }

  /**
   * Método que inicializa a conexão com o serviço do Appwrite 
   * 
   * @returns 
   */
  async init(): Promise<void> {

    try {
      [this.client, this.account] = appwriteCreateConnection(this.appwriteConfig);
      this.status = 'ready';

      this.logger.info('[Appwrite] Conexão inicializada com sucesso');
    } catch (error) {
      this.status = 'error';
      this.lastError = appwriteMapperError(error);

      this.logger.error('[Appwrite] Erro ao inicializar', {
        error,
        mappedError: this.lastError,
      });
    }
  }

  getClient(): AppwriteClient {
    if (this.client != 'NONE') {
      return this.client;
    }

    this.lastError = new UnauthorizedError();
    this.status = 'error';

     return 'NONE';
  }

  getAccount(): AppwriteAccount {
    if (this.client != 'NONE') {
      return this.account;
    }

    this.lastError = new UnauthorizedError();
    this.status = 'error';

    return 'NONE';
  }
}
