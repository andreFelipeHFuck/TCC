import { 
  Injectable,
  inject
} from '@angular/core';

import { 
  Logger, 
  UserSummary 
} from '@tcc/types';

import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class AuthProxy {
  private readonly auth = inject(Auth);
  private readonly logger = inject(Logger);

  protected service = '[APPWRITE PROXY AUTH SERVICE]';

  // async initSessionProxy(userSummary: UserSummary) {
    
  // }
}
