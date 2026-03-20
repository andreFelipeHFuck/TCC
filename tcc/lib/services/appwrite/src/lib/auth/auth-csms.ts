import { 
  Injectable,
  inject
} from '@angular/core';

import { v4 as uuidv4 } from 'uuid';

import { 
  Logger, 
  AuthCsmsFunctionBody 
} from '@tcc/types';

import { Auth } from './auth';
import { AuthUser } from './auth-user';
import { AuthGrpc } from '../functions/grpc/auth/auth-grpc';

@Injectable({
  providedIn: 'root',
})
export class AuthCsms {
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

    const authBody: AuthCsmsFunctionBody = {
      user_id: user.$id,
      user_name: user.name,
      token: token,
      session_id: uuidv4(),
      expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString()
    };

    this.logger.info(`[${this.service}] Iniciando sessão no CSMS...`);

    this.authGrpc.authSession(authBody);
  }

//   finishSessionProxy() { }
// }
}
