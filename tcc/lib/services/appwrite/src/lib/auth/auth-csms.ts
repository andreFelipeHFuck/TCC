import { 
  Injectable,
  inject
} from '@angular/core';

import { 
  Logger,
  UserAuth,
  AuthType
} from '@tcc/types';
import { AuthBusiness } from '@tcc/models';

import { CapacitorSessionService } from '@tcc/capacitor-session';

import { Auth } from './auth';
import { AuthUser } from './auth-user';
import { AuthGrpc } from '../functions/grpc/auth/auth-grpc';


@Injectable({
  providedIn: 'root',
})
export class AuthCsms {
  private readonly authBusiness = new AuthBusiness();

  private readonly auth = inject(Auth);
  private readonly authUser = inject(AuthUser);
  private readonly authGrpc = inject(AuthGrpc);
  private readonly capacitorSession = inject(CapacitorSessionService);

  private readonly logger = inject(Logger);

  protected service = 'APPWRITE CSMS AUTH SERVICE';

  private async verifyUser(): Promise<UserAuth | 'NONE'> {
    const user = await this.authUser.getUser();
    
    if (user == 'NONE') {
      this.logger.error(`[${this.service}]: Usuário não encontrado no estado local após verificação de sessão, ${user}`);
      return 'NONE';
    }

    return user;
  }

  private async createSession(user: UserAuth): Promise<boolean> {
    if(user == 'NONE') return false;

    const token = await this.auth.generateToken();

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    const authBody = this.authBusiness.generateAuthenticationRequest(
      AuthType.AUTH,
      user.$id,
      user.name,
      token,
      expiresAt
    );

    if (authBody === 'NONE') {
      this.logger.error(`[${this.service}]: Falha ao gerar Authentication Request válido`);
      return false;
    }

    this.logger.info(`[${this.service}] Iniciando sessão no CSMS...`);
    const result = await this.authGrpc.authSession(authBody);

    this.logger.info(`[${this.service}] Resultado da sessão: ${JSON.stringify(result)}`);

    if (result.success && result.sessionId) {
      this.logger.info(`[${this.service}] Sessão obtida, salvando no cache persistente: ${result.sessionId}`);
      await this.capacitorSession.setSession(result);
    }else{
      this.logger.error(`[${this.service}]: Falha ao obter sessão no CSMS`);
      return false;
    }

    this.logger.info(`[${this.service}] Sessão iniciada com sucesso: ${JSON.stringify(result)}`);
    return true;
  }

  private isSessionExpired(session: any): boolean {
    if (!session || !session.processedAt) return true;

    const sessionDate = new Date(session.processedAt);
    const now = new Date();
    const diffInMinutes = (now.getTime() - sessionDate.getTime()) / (1000 * 60);

    return diffInMinutes >= 15;
  }

  async initSession(): Promise<boolean> { 
    const user = await this.verifyUser();
    
    if (user != 'NONE') {
      const cachedSession = await this.capacitorSession.getSession();
      
      if (cachedSession) {
        if (!this.isSessionExpired(cachedSession)) {
          this.logger.info(`[${this.service}]: Sessão válida encontrada no cache ${JSON.stringify(cachedSession)}`);
          return true;
        }
        
        this.logger.info(`[${this.service}]: Sessão expirada encontrada, removendo...`);
        await this.capacitorSession.removeSession();
      }

      this.logger.info(`[${this.service}]: Iniciando sessão no CSMS...`);
      const session = await this.createSession(user);
      return session;
    }

    return false;
  }

  //private async closeSession() {}

  // finishSession() {
  //   const user = await this.verifyUser();
    
  //   if (user !== 'NONE') {

  //   }
    
  // }


}
