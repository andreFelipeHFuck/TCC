import {
  Injectable,
  inject
} from '@angular/core';

import { ID } from 'appwrite';

import { Appwrite } from '../appwrite';
import {
  UseConnection,
  AppwriteAccount,
  Logger
} from '@tcc/types';

@Injectable({
  providedIn: 'root',
})
export class Auth extends UseConnection {
  private readonly appwrite: Appwrite = inject(Appwrite);
  private readonly logger = inject(Logger);

  private account: AppwriteAccount = 'NONE';

  constructor() {
    super();
    this.init();
  }

  protected async init() {
    const _ = await this.appwrite.init();
    const isReady = this.appwrite.isReady();

    if (isReady) {
      this.account = this.appwrite.getAccount();
    }
  }

  /**
   * Cria uma nova conta
   * 
   * @param name Nome do usuário
   * @param email Email do usuário
   * @param password Senha do usuário
   */
  async create(name: string, email: string, password: string) {
    if (this.account === 'NONE') {
      throw new Error(' [APPWRITE AUTH SERVICE] Serviço do Appwrite não está inicializado.');
    }

    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      this.logger.info(`[APPWRITE AUTH SERVICE] Conta criada com sucesso: ${user.$id}`);
      return user;
    } catch (error) {
      this.logger.error('[APPWRITE AUTH SERVICE] Erro ao criar conta', { error });
      throw error;
    }
  }

  login() { }

  logout() { }

  initSessionProxy() { }

  finishSessionProxy() { }
}
