import { Injectable } from '@angular/core';
import { Account, Client, ID, Models } from 'appwrite';

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

  async get(): Promise<Models.User<Models.Preferences>> {
    return await this.handleCall(
      this.account,
      (account: Account) => account.get(),
      this.service,
      'Dados do usuário retornados com sucesso',
      'Não foi possível retornar os dados'
    );
  }

  async create(name: string, email: string, password: string): Promise<Models.User<Models.Preferences>> {
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

  async login(email: string, password: string): Promise<Models.Session> {
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
