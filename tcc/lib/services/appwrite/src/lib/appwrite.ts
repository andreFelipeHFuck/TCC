import { inject, Injectable } from '@angular/core';
import { APPWRITE_CONFIG } from './appwrite-connections/appwrite-token.token';

import {
   AppwriteAccount, 
   AppwriteClient, 
   AppwriteConfig, 
   AppwriteError, 
   UnauthorizedError
  } from "@tcc/types";
import { appwriteMapperError } from '@tcc/appwrite-adapter';

import { appwriteCreateConnection } from './appwrite-connections/appwrite-connections.utils';

@Injectable({
  providedIn: 'root',
})
export class Appwrite {
  private readonly appwriteConfig: AppwriteConfig = inject(APPWRITE_CONFIG);

  private client: AppwriteClient = 'NONE';
  private account: AppwriteAccount = 'NONE';

  private status: 'ready' | 'error' = 'ready';
  private lastError?: AppwriteError;

  /**
   * Método que inicializa a conexão com o serviço do Appwrite 
   * 
   * @returns 
   */
  async init(): Promise<void> {

    try {
      [this.client, this.account] = appwriteCreateConnection(this.appwriteConfig);
      this.status = 'ready';
    } catch (error) {
      this.status = 'error';
      this.lastError = appwriteMapperError()
    }
  }

  isReady(): boolean {
    return this.status === 'ready';
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

  getError(): AppwriteError | undefined {
    return this.lastError;
  }
}
