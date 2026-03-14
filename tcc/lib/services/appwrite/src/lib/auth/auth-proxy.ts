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

  private async generateUserSummary(): Promise<UserSummary | null> {
    const user = await this.authUser.getUser();
    
    if(!user) {
      this.logger.error(`${this.service} Usuário não encontrado`);
      return null;
    }

    const userSummary: UserSummary = {
      userId: user.$id,
      userName: user.name,
    };
    
    return userSummary;
  }

  async initSessionProxy() {
    const checkSession = await this.authUser.checkSession();
    
    if(!checkSession) {
      this.logger.error(`${this.service} Sessão não encontrada`);
      return;
    }

   
  }
}
