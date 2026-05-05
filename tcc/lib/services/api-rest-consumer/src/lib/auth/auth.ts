import { 
    inject, 
    Injectable 
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { lastValueFrom } from 'rxjs';

import { 
    IAuthDriver,
    RestServices, 
    UserLoggedIn
} from '@tcc/types';
import { CapacitorSessionService } from '@tcc/capacitor-session';

import { ApiRest } from '../../api-rest';

const AUTH_ENDPOINT = '/auth/login';

@Injectable({
    providedIn: 'root'
})
export class Auth extends ApiRest implements IAuthDriver {
    private readonly httpClient = inject(HttpClient);
    private readonly capacitorSession = inject(CapacitorSessionService);

    constructor() {
        super();
        this.service = RestServices.AUTH;
    }

    async get(): Promise<UserLoggedIn | 'NONE'> {
       const session = await this.capacitorSession.apiRestGetSession();
       return session ? session : 'NONE';
    }

    async create(name: string, email: string, password: string): Promise<UserLoggedIn> {
      return 'NONE';
    }

    async login(email: string, password: string): Promise<UserLoggedIn | 'NONE'> {
       const result = await this.handleCall(
        () => lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}${AUTH_ENDPOINT}`, { email, password })),
        RestServices.AUTH,
        'Login realizado com sucesso',
        'Erro ao realizar login'
       );

       if(result === 'NONE') {
        return 'NONE';
       } 

       const userLoggedIn: UserLoggedIn = {
          $id: result.data.userId,
          email: result.data.email,
          accessToken: result.data.access_token,
          user: result.data.user
       };

       // Salva no cache para que o get() possa recuperar depois
       await this.capacitorSession.apiRestSetSession(userLoggedIn);

       return userLoggedIn;
    }

    async generateToken(): Promise<string> {
      return 'NONE';
    }

    async logout(): Promise<void> {
      await this.capacitorSession.apiRestRemoveSession();
    }
}