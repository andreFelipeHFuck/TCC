import { inject, Injectable } from '@angular/core';
import { 
  Account, 
  ID, 
  Models 
} from 'appwrite';

import { 
  IAuthDriver, 
  AppwriteServices, 
  UserLoggedIn
} from '@tcc/types';

import { Appwrite } from '../appwrite';

@Injectable({
  providedIn: 'root',
})
export class Auth extends Appwrite implements IAuthDriver {  
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

  async login(email: string, password: string): Promise<UserLoggedIn | 'NONE'> {
    try {
      const session = await this.handleCall(
        this.account,
        (account: Account) => account.createEmailPasswordSession(
          email,
          password
        ),
        this.service,
        'Login feito com sucesso',
        'Erro ao fazer login'
      );

      // Mapeamos o retorno do Appwrite para o formato agnóstico
      return { 
        $id: session.userId || session['$id'], 
        email: email 
      };
    } catch (error) {
      return 'NONE';
    }
  }

  async logout() {
    await this.handleCall(
      this.account,
      (account: Account) => account.deleteSession('current'),
      this.service,
      'Usuário deslogado com sucesso',
      'Erro ao fazer logout'
    );
  }

  async generateToken(): Promise<string> {
    /**
     * @todo Aumentar o tempo de expiração do Token
     */
    const token =  await this.handleCall(
      this.account,
      (account: Account) => account.createJWT(),
      this.service,
      'Token gerado com sucesso',
      'Erro ao gerar token'
    );

    return token.jwt;
  }
}
