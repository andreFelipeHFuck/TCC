import { inject, Injectable } from '@angular/core';

import {
  AppwriteAccount,
  AppwriteClient,
  AppwriteConfig,
  AppwriteError,
  AppwriteServices,
  ConnectionServices,
  Logger,
  UnauthorizedError
} from "@tcc/types";
import { appwriteMapperError } from '@tcc/appwrite-adapter';

import { APPWRITE_CONFIG } from './appwrite-connections/appwrite-token';
import { appwriteCreateConnection } from './appwrite-connections/appwrite-connections-utils';

@Injectable({
  providedIn: 'root',
})
export class Appwrite extends ConnectionServices<AppwriteError> {
  private readonly appwriteConfig: AppwriteConfig = inject(APPWRITE_CONFIG);
  private readonly logger = inject(Logger);

  private client: AppwriteClient = 'NONE';
  private account: AppwriteAccount = 'NONE';

  constructor() {
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
      this.setReady();

      this.logger.info('[APPWRITE SERVICE] Conexão inicializada com sucesso');
    } catch (error) {
      this.setError(appwriteMapperError(AppwriteServices.CONNECTION, error));

      this.logger.error('[APPWRITE SERVICE] Erro ao inicializar', {
        error,
        mappedError: this.getError(),
      });
    }
  }

  getClient(): AppwriteClient {
    if (this.client != 'NONE') {
      return this.client;
    }

    this.setError(appwriteMapperError(AppwriteServices.CONNECTION, new Error('Cliente não inicializado')));

    return 'NONE';
  }

  getAccount(): AppwriteAccount {
    if (this.client != 'NONE') {
      return this.account;
    }

    this.setError(appwriteMapperError(AppwriteServices.CONNECTION, new Error('Cliente não inicializado')));

    return 'NONE';
  }
}
