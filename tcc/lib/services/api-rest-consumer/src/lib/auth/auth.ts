import { 
    inject, 
    Injectable 
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { lastValueFrom } from 'rxjs';

import { 
    IAuthDriver,
    RestServices, 
    User,
    UserLoggedIn
} from '@tcc/types';

import { ApiRest } from '../../api-rest';

const ENDPOINT = '/auth/login';

@Injectable({
    providedIn: 'root'
})
export class Auth extends ApiRest implements IAuthDriver {
    private readonly httpClient = inject(HttpClient);

    constructor() {
        super();
        this.service = RestServices.AUTH;
    }

    async get(): Promise<UserLoggedIn | 'NONE'> {
      return 'NONE';   
    }

    async create(name: string, email: string, password: string): Promise<UserLoggedIn> {
      return 'NONE';
    }

    async login(email: string, password: string): Promise<UserLoggedIn> {
       return await this.handleCall(
        () => lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}${ENDPOINT}`, { email, password })),
        RestServices.AUTH,
        'Login realizado com sucesso',
        'Erro ao realizar login'
       );
    }

    async generateToken(): Promise<string> {
      return 'NONE';
    }

    async logout(): Promise<void> {
      return;
    }
}