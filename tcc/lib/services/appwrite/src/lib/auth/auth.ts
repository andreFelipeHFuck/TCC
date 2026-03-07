import {
  Injectable,
  inject
} from '@angular/core';

import { Account, Client, ID } from 'appwrite';

import { Appwrite } from '../appwrite';
import { AppwriteServices } from '@tcc/types';


@Injectable({
  providedIn: 'root',
})
export class Auth extends Appwrite {

  constructor() {
    super();
    this.service = AppwriteServices.AUTH;
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
      this.account,
      (account: Account) => account.create(
        ID.unique(),
        email,
        password,
        name
      ),
      this.service,
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
      this.account,
      (account: Account) => account.createEmailPasswordSession(
        email,
        password
      ),
      this.service,
      'Login feito com sucesso',
      'Erro ao fazer login'
    );
  }

  logout() { }

  initSessionProxy() { }

  finishSessionProxy() { }
}
