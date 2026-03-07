import { inject, Injectable } from '@angular/core';
import { Account } from 'appwrite';

import {
  AppwriteAccount,
  AppwriteClient,
  AppwriteDatabases,
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

  protected service: AppwriteServices = AppwriteServices.CONNECTION;

  protected client: AppwriteClient = 'NONE';
  protected account: AppwriteAccount = 'NONE';
  protected databases: AppwriteDatabases = 'NONE';

  constructor() {
    super();
    this.init();
  }

  /**
   * Método que inicializa a conexão com o serviço do Appwrite 
   * 
   * @returns 
   */
  async init(): Promise<void> {

    try {
      [this.client, this.account, this.databases] = appwriteCreateConnection(this.appwriteConfig);
      this.setReady();

      this.logger.info(`[${this.service.valueOf()}] Conexão inicializada com sucesso`);
    } catch (error) {
      this.setError(appwriteMapperError(this.service, error));

      this.logger.error(`[${this.service.valueOf()}] Erro ao inicializar`, {
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
    if (this.account != 'NONE') {
      return this.account;
    }

    this.setError(appwriteMapperError(AppwriteServices.CONNECTION, new Error('Account não inicializado')));

    return 'NONE';
  }

  getDatabases(): AppwriteDatabases {
    if (this.databases != 'NONE') {
      return this.databases;
    }

    this.setError(appwriteMapperError(AppwriteServices.CONNECTION, new Error('Databases não inicializado')));

    return 'NONE';
  }

  /**
   * Método que trata os erros que podem ocorrer durante a execução de uma promise do Appwrite
   * 
   * @param promise Promise que será executada
   * @param service Serviço que será executado
   * @param serviceName Nome do serviço que será executado
   * @param successMessage Mensagem de sucesso
   * @param errorMessage Mensagem de erro
   * @param silent Flag que indica se o erro deve ser exibido
   * @returns 
   */
  public async handleCall<T, S>(
    service: S | 'NONE',
    call: (instance: S) => Promise<T>,
    serviceId: AppwriteServices,
    successMessage: string,
    errorMessage: string,
    silent: boolean = false
  ) {

    if (this.client === 'NONE' || service === 'NONE') {
      this.logger.error(`[${serviceId.valueOf()}] Problema ao tentar acessar o serviço`, this.getError());

      this.setError(appwriteMapperError(
        AppwriteServices.CONNECTION,
        new UnauthorizedError
      ));

      throw this.getError();
    }

    try {
      this.logger.info(`[${serviceId.valueOf()}] ${successMessage}`);
      return await call(service as S);
    } catch (error) {
      this.setError(appwriteMapperError(serviceId, error));
      this.logger.error(`[${serviceId.valueOf()}] ${errorMessage}`, this.getError());

      if (!silent) {
        // this.notifier.showError(translatedError.message);
      }

      throw this.getError();
    }
  }
}
