import { 
  Injectable,
  inject
} from '@angular/core';

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

  protected service = 'APPWRITE PROXY AUTH SERVICE';

  async initSessionProxy() { 
    // const user = this.authUser.getUser();
    // const token = await this.auth.generateToken();

    // if (!user) {
    //   this.logger.error(`${this.service} Usuário não encontrado no estado local após verificação de sessão`);
    //   return;
    // }

    const authBody: AuthCsmsFunctionBody = {
      userId: '69a6e7d2e94aa809e9ef', //user.$id,
      userName: 'andre', //user.name,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', //token,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000)
    };

    this.logger.info(`[${this.service}] Iniciando sessão proxy...`);

    this.authGrpc.authSession(authBody);
  }

//   finishSessionProxy() { }
// }
}
