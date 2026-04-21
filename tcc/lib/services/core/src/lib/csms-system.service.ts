import { 
  Injectable,
  inject
} from '@angular/core';

import { 
  Logger,
  UserAuth,
  AuthType,
  AUTH_SERVICE,
  AUTH_DRIVER,
  AUTH_GRPC_DRIVER
} from '@tcc/types';
import { AuthBusiness } from '@tcc/models';

import { CapacitorSessionService } from '@tcc/capacitor-session';

/**
 * @class CsmsSystem
 * 
 * Este serviço é o núcleo da orquestração de sessões do CSMS, totalmente agnóstico de backend.
 * Ele gerencia o ciclo de vida da sessão (inicialização, expiração e finalização)
 * consumindo as interfaces genéricas do sistema.
 */
@Injectable({
  providedIn: 'root',
})
export class CsmsSystem {
  private readonly authBusiness = new AuthBusiness();

  private readonly authService = inject(AUTH_SERVICE);      // Sistema de auth core
  private readonly authDriver = inject(AUTH_DRIVER);        // Adaptador de Auth (ex: Appwrite)
  private readonly authGrpc = inject(AUTH_GRPC_DRIVER);     // Adaptador de gRPC
  private readonly capacitorSession = inject(CapacitorSessionService); // Sistema de Cache

  private readonly logger = inject(Logger);

  protected service = 'CORE CSMS SYSTEM';

  private async verifyUser(): Promise<UserAuth | 'NONE'> {
    const user = await this.authService.getUser();
    
    if (user === 'NONE') {
      this.logger.error(`[${this.service}]: Usuário não encontrado no estado local após verificação de sessão`);
      return 'NONE';
    }

    return user;
  }

  private async createSession(user: UserAuth): Promise<boolean> {
    if(user === 'NONE') return false;

    // Obtém o token do driver de autenticação (ex: JWT do Appwrite)
    const token = await this.authDriver.generateToken();

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos
    const authBody = this.authBusiness.generateAuthenticationRequest(
      AuthType.AUTH,
      user.userId,
      user.name,
      token,
      expiresAt
    );

    if (authBody === 'NONE') {
      this.logger.error(`[${this.service}]: Falha ao gerar Authentication Request válido`);
      return false;
    }

    this.logger.info(`[${this.service}] Iniciando sessão no CSMS gRPC...`);
    const result = await this.authGrpc.authSession(authBody);

    this.logger.info(`[${this.service}] Resultado da sessão: ${JSON.stringify(result)}`);

    if (result.success && result.sessionId) {
      this.logger.info(`[${this.service}] Sessão obtida, salvando no cache persistente: ${result.sessionId}`);
      await this.capacitorSession.setSession(result);
    } else {
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
    
    if (user !== 'NONE') {
      const cachedSession = await this.capacitorSession.getSession();
      
      if (cachedSession) {
        if (!this.isSessionExpired(cachedSession)) {
          this.logger.info(`[${this.service}]: Sessão válida encontrada no cache ${JSON.stringify(cachedSession)}`);
          return true;
        }
        
        this.logger.info(`[${this.service}]: Sessão expirada encontrada, removendo...`);
        await this.capacitorSession.removeSession();
      }

      this.logger.info(`[${this.service}]: Gerando nova sessão no CSMS...`);
      return await this.createSession(user);
    }

    return false;
  }

  private async closeSession(sessionId: string): Promise<boolean> {
    this.logger.info(`[${this.service}] Finalizando sessão no CSMS...`);
    const logoutBody = this.authBusiness.generateLogoutRequest(AuthType.LOGOUT, sessionId);

    if (logoutBody === 'NONE') {
      this.logger.error(`[${this.service}]: Falha ao gerar Logout Request válido`);
      return false;
    }

    const result = await this.authGrpc.logout(logoutBody);

    this.logger.info(`[${this.service}] Resultado do logout gRPC: ${JSON.stringify(result)}`);

    if (result.success) {
      this.logger.info(`[${this.service}] Sessão encerrada no CSMS gRPC com sucesso`);
      await this.capacitorSession.removeSession();
      return true;
    }

    this.logger.error(`[${this.service}]: Falha ao encerrar sessão no CSMS gRPC`);
    return false;
  }

  async finishSession(): Promise<boolean> {
    const user = await this.verifyUser();
    
    if (user !== 'NONE') {
      const cachedSession = await this.capacitorSession.getSession();

      if (cachedSession) {
        return await this.closeSession(cachedSession.sessionId);
      }

      this.logger.error(`[${this.service}]: Sessão não encontrada no cache para fechamento`);
      return false;
    }

    return false;
  }
}
