import { 
  Injectable,
  inject
} from '@angular/core';

import { 
  Logger
} from '@tcc/types';
import { AuthBusiness } from '@tcc/models';

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

  private readonly logger = inject(Logger);

  protected service = 'APPWRITE CSMS AUTH SERVICE';

  async initSession() { 
    const user = await this.authUser.getUser();
    
    if (user == 'NONE') {
      this.logger.error(`[${this.service}]: Usuário não encontrado no estado local após verificação de sessão, ${user}`);
      return;
    }
  
    const token = await this.auth.generateToken();

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    const authBody = this.authBusiness.generateAuthenticationRequest(
      user.$id,
      user.name,
      token,
      expiresAt
    );

    if (authBody === 'NONE') {
      this.logger.error(`[${this.service}]: Falha ao gerar Authentication Request válido`);
      return;
    }

    this.logger.info(`[${this.service}] Iniciando sessão no CSMS...`);
    const result = await this.authGrpc.authSession(authBody);
    this.logger.info(`[${this.service}] Sessão iniciada com sucesso: ${JSON.stringify(result)}`);
  }

//   finishSessionProxy() { }
// }
}
