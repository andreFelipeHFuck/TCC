import { 
  Injectable, 
  inject
} from "@angular/core";

import { 
  AuthService, 
  CreateUserFrontendDTO, 
  Logger, 
  User,
  UserAuth,
  UserLoggedIn,
  UserSession
} from "@tcc/types";

import { appwriteUserToUserCreateDTO } from '@tcc/appwrite-adapter';
import { CapacitorSessionService } from '@tcc/capacitor-session';

import { Auth } from "./auth";
import { DatabaseUser } from "../database/database-user";

@Injectable({
  providedIn: 'root',
})
export class AuthUser implements AuthService {
  private readonly auth = inject(Auth);
  private readonly databaseUser = inject(DatabaseUser);
  private readonly capacitorSession = inject(CapacitorSessionService);
  private readonly logger = inject(Logger);

  protected service = '[API REST USER AUTH SERVICE]';

  async isLoggedIn(): Promise<UserLoggedIn> {
    try {
      const cachedSession = await this.capacitorSession.apiRestGetSession();

      if (cachedSession) {
        return cachedSession;
      }

      this.logger.error(`${this.service} Usuário não autenticado`);
      return 'NONE';
    } catch (_) {
      this.logger.error(`${this.service} Erro ao obter usuário autenticado`);
      return 'NONE';
    }
  }

  async getUser(): Promise<UserAuth> {
    const isLoggedIn = await this.isLoggedIn();

    if (isLoggedIn === 'NONE') {
      this.logger.error(`${this.service} Usuário não autenticado`);
      return 'NONE';
    } else {
      if(isLoggedIn.user) {
        this.logger.info(`${this.service} Usuário autenticado`);
        return isLoggedIn.user;
      }

      this.logger.error(`${this.service} Usuário não autenticado`);
      return 'NONE';
    }
  }

  async createUser(user: User) {
    const userCreateDTO: CreateUserFrontendDTO = appwriteUserToUserCreateDTO(user);

    await this.databaseUser.create(userCreateDTO);

    await this.login(userCreateDTO.email, userCreateDTO.password!);
  }

  async login(email: string, password: string): Promise<UserSession> {
    const authUser = await this.auth.login(email, password);

    if (authUser !== 'NONE') {
      // Salva no cache do Capacitor
      await this.capacitorSession.apiRestSetSession(authUser);

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

  async logout(): Promise<void> {
    await this.auth.logout();
    await this.capacitorSession.apiRestRemoveSession();
  }
}
