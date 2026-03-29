import { 
  Injectable, 
  inject 
} from '@angular/core';

import {
  AuthService,
  AUTH_DRIVER,
  DATABASE_DRIVER,
  Logger,
  User,
  UserAuth,
  UserCreateDTO,
  UserLoggedIn,
  UserSession
} from '@tcc/types';

/**
 * @class AuthSystem
 * @implements AuthService
 * 
 * Este é o serviço central de autenticação do sistema, totalmente agnóstico de backend.
 * Toda a lógica de consistência (checar se o usuário existe em Auth e no DB) está aqui.
 * 
 * Ele consome drivers genéricos (IAuthDriver e IDatabaseDriver) que podem ser 
 * implementados por Appwrite, Firebase, etc.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthSystem implements AuthService {
  private readonly authDriver = inject(AUTH_DRIVER);        // Agnóstico!
  private readonly databaseDriver = inject(DATABASE_DRIVER); // Agnóstico!
  private readonly logger = inject(Logger);

  protected service = '[CORE SYSTEM AUTH SERVICE]';

  async isLoggedIn(): Promise<UserLoggedIn> {
    try {
      const user = await this.authDriver.get();

      if (!user) {
        return 'NONE';
      }

      return { $id: user.$id, email: user.email };
    } catch (error) {
      this.logger.error(`${this.service} Erro ao obter usuário autenticado`);
      return 'NONE';
    }
  }

  async getUser(): Promise<UserAuth> {
    const isLoggedIn = await this.isLoggedIn();

    if (isLoggedIn === 'NONE') {
      this.logger.error(`${this.service} Usuário não autenticado no driver`);
      return 'NONE';
    } else {
      const dbUser = await this.databaseDriver.getByEmail(isLoggedIn.email);

      if (dbUser === 'NONE') {
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
    // Note: Em um sistema agnóstico, o mapeamento para DTO deve ser feito 
    // antes de chegar aqui ou por um serviço de tradução.
    // Por enquanto, assumimos que o objeto 'user' é compatível ou já mapeado.
    const userCreateDTO: UserCreateDTO = user as unknown as UserCreateDTO;

    await this.authDriver.create(userCreateDTO.name, userCreateDTO.email, userCreateDTO.password!);
    await this.databaseDriver.create(userCreateDTO);

    await this.login(userCreateDTO.email, userCreateDTO.password!);
  }

  async login(email: string, password: string): Promise<UserSession> {
    await this.authDriver.login(email, password);
    const authUser = await this.isLoggedIn();

    if (authUser !== 'NONE') {
      const dbUser = await this.databaseDriver.login(email, password);

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

  async logout(): Promise<void> {
    await this.authDriver.logout();
    this.logger.info(`${this.service} Logout realizado nos drivers`);
  }
}
