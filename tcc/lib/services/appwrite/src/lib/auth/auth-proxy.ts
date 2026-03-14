import { 
  Injectable,
  inject
} from '@angular/core';

import { 
  Logger, 
  UserSummary 
} from '@tcc/types';

import { Auth } from './auth';
import { AuthUser } from './auth-user';

@Injectable({
  providedIn: 'root',
})
export class AuthProxy {
  private readonly auth = inject(Auth);
  private readonly authUser = inject(AuthUser);
  private readonly logger = inject(Logger);

  protected service = '[APPWRITE PROXY AUTH SERVICE]';

  async initSessionProxy() {
    const checkSession = await this.authUser.checkSession();
    
    if(!checkSession) {
      this.logger.error(`${this.service} Sessão não encontrada`);
      return;
    }

   
  }
}
