import { 
  Injectable, 
  inject
} from '@angular/core';

import {
  AuthService,
  Logger,
  User,
  UserAuth,
  CreateUserFrontendDTO,
  UserLoggedIn,
  UserSession
} from '@tcc/types';
import { appwriteUserToUserCreateDTO } from '@tcc/appwrite-adapter';

import { Auth } from './auth';
import { DatabaseUser } from '../database/database-user';

@Injectable({
  providedIn: 'root',
})
export class AuthUser implements AuthService {
  private readonly auth = inject(Auth);
  private readonly databaseUser = inject(DatabaseUser);
  private readonly logger = inject(Logger);

  protected service = '[APPWRITE USER AUTH SERVICE]'

/**
 * @todo Refatoração de AuthUser
 * 4 - Refatorar o serviço de logger deixando mais simples e menos propenso a erros entre os vários serviços
 */

  async isLoggedIn(): Promise<UserLoggedIn> {
    try {
      const user = await this.auth.get();

      if (!user) {
        return 'NONE';
      }

      return { $id: user.$id, email: user.email };
    } catch (error) {
      this.logger.error(`${this.service} Erro ao obter usuário autenticado`);
      return 'NONE';
    }
  }

  async getUser(): Promise<UserAuth>{
    const isLoggedIn = await this.isLoggedIn();

    if(isLoggedIn === 'NONE') {
      this.logger.error(`${this.service} Usuário não autenticado`);
      return 'NONE';
    } else {
       const dbUser = await this.databaseUser.getByEmail(isLoggedIn.email);

      if (dbUser == 'NONE') {
        this.logger.error(`${this.service} Usuário autenticado no Auth, mas NÃO encontrado no Banco de Dados`);
        return 'NONE';
      }

        const isConsistent = isLoggedIn.email === dbUser.email;

        if (isConsistent) {
          this.logger.info(`${this.service} Autenticação consistente entre Auth e Database`);
          return dbUser;
        } else {
          this.logger.warn(`${this.service} Autenticação realizada, mas os emails divergiram entre os serviços`);
          return 'NONE';
        }
    }
  }

  async createUser(user: User) {
    const userCreateDTO: CreateUserFrontendDTO = appwriteUserToUserCreateDTO(user);

    await this.auth.create(userCreateDTO.name, userCreateDTO.email, userCreateDTO.password!);
    await this.databaseUser.create(userCreateDTO);

    await this.login(userCreateDTO.email, userCreateDTO.password!);
  }

  async login(email: string, password: string): Promise<UserSession> {
   const authSession = await this.auth.login(email, password);

    const authUser = await this.isLoggedIn();

    if(authUser !== 'NONE') {
      const dbUser = await this.databaseUser.login(email, password);

      if (dbUser === 'NONE') {
        this.logger.error(`${this.service} Usuário autenticado no Auth, mas NÃO encontrado no Banco de Dados`);
        return { session: false, dbUser: 'NONE', isConsistent: false };
      }

      const isConsistent = authUser.email === dbUser.email;

      if (isConsistent) {
        this.logger.info(`${this.service} Autenticação consistente entre Auth e Database`);
        return { session: true, dbUser: dbUser, isConsistent: true };
      } else {
        this.logger.warn(`${this.service} Autenticação realizada, mas os emails divergiram entre os serviços`);
        return { session: true, dbUser: dbUser, isConsistent: false };
      }
    }

    return { session: false, dbUser: 'NONE', isConsistent: false };
  }

  async logout() {
    await this.auth.logout();
  }
}
