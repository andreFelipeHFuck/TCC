import {
  Injectable,
  inject
} from '@angular/core';

import { Account, Client, ID } from 'appwrite';

import { Appwrite } from '../appwrite';
import {
  AppwriteAccount,
  Logger,
  ConnectionServices,
  AppwriteError,
  AppwriteServices
} from '@tcc/types';
import { appwriteMapperError } from '@tcc/appwrite-adapter';


@Injectable({
  providedIn: 'root',
})
export class Auth extends Appwrite {

  private readonly service: AppwriteServices = AppwriteServices.AUTH;
  private readonly serviceName: string = '[APPWRITE AUTH SERVICE]';

  constructor() {
    super();
    this.init();
  }


  /**
   * Cria uma nova conta
   * 
   * @param name Nome do usuário
   * @param email Email do usuário
   * @param password Senha do usuário
   */
  async create(name: string, email: string, password: string) {
    return await this.handleCall(
      (account) => account.create(
        ID.unique(),
        email,
        password,
        name
      ),
      this.service,
      this.serviceName,
      'Conta criada com sucesso',
      'Erro ao criar conta'
    );
  }

  /**
   * Realiza o login do usuário
   * 
   * @param email Email do usuário
   * @param password Senha do usuário
   */
  async login(email: string, password: string) {
    return await this.handleCall(
      (account) => account.createEmailPasswordSession(
        email,
        password
      ),
      this.service,
      this.serviceName,
      'Login feito com sucesso',
      'Erro ao fazer login'
    );
  }

  logout() { }

  initSessionProxy() { }

  finishSessionProxy() { }
}
