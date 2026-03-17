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
import { appwriteUserToUserCreateDTO, userCreateDTOToUser } from '@tcc/appwrite-adapter';

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

  currentUser = signal<User | null>(null);

  private async fillInUser(id: string): Promise<void> {
    const dataUser = await this.databaseUser.get<UserCreateDTO>(id);

    if (!dataUser) {
      this.logger.error(`${this.service} Dados do usuário não encontrados no banco para o ID: ${id}`);
      this.currentUser.set(null);
      return;
    }

    const user = userCreateDTOToUser(dataUser);
    user.$id = id;

    this.currentUser.set(user);
    this.logger.info(`${this.service} Signal currentUser preenchido com sucesso.`);
  }

  private async checkSession() {
    const authUser = await this.auth.get();

    if (!authUser) {
      this.logger.error(`${this.service} Usuário não autenticado`);
      this.currentUser.set(null);
      return;
    }

    this.logger.debug(`${this.service} Usuário autenticado no Auth: ${authUser.email}`);

    const dbUser = await this.databaseUser.getByEmail(authUser.email);

    if (!dbUser) {
      this.logger.error(`${this.service} Usuário autenticado no Auth, mas NÃO encontrado no Banco de Dados`);
      this.currentUser.set(null);
      return;
    }

    const isConsistent = authUser.email === dbUser.email;

    if (isConsistent) {
      this.logger.info(`${this.service} Autenticação consistente entre Auth e Database`);
      await this.fillInUser(dbUser.id);
    } else {
      this.logger.warn(`${this.service} Autenticação realizada, mas os emails divergiram entre os serviços`);
      this.currentUser.set(null);
    }
  }

  /**
   * Retorna os dados do usuário logado
   * 
   * @todo dados do usuário logado
   */
  getUser(): User | null {
    this.logger.debug(`${this.service} Verificando se o usuário está logado, ${JSON.stringify(this.currentUser())}`);
    if(!this.currentUser()){
      this.checkSession();
    }
    return this.currentUser();
  }

  async createUser(user: User) {
    const userCreateDTO: UserCreateDTO = appwriteUserToUserCreateDTO(user);

    await this.auth.create(userCreateDTO.name, userCreateDTO.email, userCreateDTO.password);
    await this.databaseUser.create(userCreateDTO);

    await this.login(userCreateDTO.email, userCreateDTO.password);
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
      await this.fillInUser(dbUser.id);
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
