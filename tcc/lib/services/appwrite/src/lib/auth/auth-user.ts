import { inject, Injectable } from '@angular/core';


import {
  Logger,
  User,
  UserCreateDTO
} from '@tcc/types';
import { Auth } from './auth';
import { DatabaseUser } from '../database/database-user';
import { appwriteUserToUserCreateDTO } from '@tcc/appwrite-adapter';

@Injectable({
  providedIn: 'root',
})
export class AuthUser {
  private readonly auth = inject(Auth);
  private readonly databaseUser = inject(DatabaseUser);
  private readonly logger = inject(Logger);

  protected service = '[APPWRITE USER AUTH SERVICE]'

  async createUser(user: User) {
    const userCreateDTO: UserCreateDTO = appwriteUserToUserCreateDTO(user);

    // await this.auth.create(userCreateDTO.name, userCreateDTO.email, userCreateDTO.password);
    // await this.databaseUser.create(userCreateDTO);

    await this.login(userCreateDTO.email, userCreateDTO.password);
  }

  /**
   * Verifica se a autenticação é válida tanto no Auth quanto no Database
   */
  async login(email: string, password: string) {
    this.logger.info(`${this.service} Iniciando verificação de autenticação dupla...`);

    // 1. Verifica no Appwrite Auth (Gera sessão)
    const authSession = await this.auth.login(email, password);
    const authUser = await this.auth.get();

    // 2. Verifica no Banco de Dados
    const dbUser = await this.databaseUser.login(email, password);

    // 3. Comparação
    if (!dbUser) {
      this.logger.error(`${this.service} Usuário autenticado no Auth, mas NÃO encontrado no Banco de Dados.`);
      return { authUser, dbUser: null, consistent: false };
    }

    const isConsistent = authUser.email === dbUser;

    if (isConsistent) {
      this.logger.info(`${this.service} Autenticação consistente entre Auth e Database.`);
    } else {
      this.logger.warn(`${this.service} Autenticação realizada, mas os emails divergiram entre os serviços.`);
    }

    return { authSession, authUser, dbUser, isConsistent };
  }

  async logout() {
    await this.auth.logout();
  }
}
