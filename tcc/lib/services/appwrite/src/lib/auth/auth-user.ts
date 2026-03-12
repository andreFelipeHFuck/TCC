import { 
  Injectable, 
  inject, 
  signal 
} from '@angular/core';

import {
  Logger,
  User,
  UserCreateDTO
} from '@tcc/types';
import { appwriteUserToUserCreateDTO } from '@tcc/appwrite-adapter';

import { Auth } from './auth';
import { DatabaseUser } from '../database/database-user';

@Injectable({
  providedIn: 'root',
})
export class AuthUser {
  private readonly auth = inject(Auth);
  private readonly databaseUser = inject(DatabaseUser);
  private readonly logger = inject(Logger);

  protected service = '[APPWRITE USER AUTH SERVICE]'

  // User | null
  currentUser = signal<User | null>(null);

  async getUser(id: string) {
    const user = await this.databaseUser.get(id);
    
    return user;
  }

  private async fillInUser(id: string) {
    const dataUser = await this.databaseUser.get(id);

  }

  async createUser(user: User) {
    const userCreateDTO: UserCreateDTO = appwriteUserToUserCreateDTO(user);

    await this.auth.create(userCreateDTO.name, userCreateDTO.email, userCreateDTO.password);
    await this.databaseUser.create(userCreateDTO);

    await this.login(userCreateDTO.email, userCreateDTO.password);
  }

  async checkSession(): Promise<boolean> {
    const session = await this.auth.get();
    // const dataUser = await this.databaseUser.get();

    // || !dataUser
    if (!session ) {
      this.currentUser.set(null);
      return false;
    }

    // this.currentUser.set(dataUser);
    return true;
  }

  /**
   * Verifica se a autenticação é válida tanto no Auth quanto no Database
   */
  async login(email: string, password: string) {
    this.logger.info(`${this.service} Iniciando verificação de autenticação dupla...`);

    const authSession = await this.auth.login(email, password);
    const authUser = await this.auth.get();

    const dbUser = await this.databaseUser.login(email, password);

    if (!dbUser) {
      this.logger.error(`${this.service} Usuário autenticado no Auth, mas NÃO encontrado no Banco de Dados`);
      this.currentUser.set(null);
      return { authUser, dbUser: null, consistent: false };
    }

    const isConsistent = authUser.email === dbUser.email;

    if (isConsistent) {
      this.logger.info(`${this.service} Autenticação consistente entre Auth e Database`);
    } else {
      this.logger.warn(`${this.service} Autenticação realizada, mas os emails divergiram entre os serviços`);
      this.currentUser.set(null);
    }

    return { authSession, authUser, dbUser, isConsistent };
  }

  async logout() {
    await this.auth.logout();
  }
}
