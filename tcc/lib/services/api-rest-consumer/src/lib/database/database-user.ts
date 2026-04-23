
import { 
    Injectable, 
    inject
} from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { lastValueFrom } from 'rxjs';

import { 
    CreateUserFrontendDTO,
    CrudServiceDB, 
    IDatabaseDriver, 
    RestDatabaseCollection, 
    RestServices,
    UserAuth
} from "@tcc/types";

import { ApiRest } from "../../api-rest";

const USER_ENDPOINT = '/users/';
const AUTH_ENDPOINT = '/auth/';

@Injectable({
  providedIn: 'root',
})
export class DatabaseUser 
extends ApiRest 
implements CrudServiceDB, IDatabaseDriver {
   private readonly httpClient = inject(HttpClient);

   private readonly collection = RestDatabaseCollection.USER;

   public async get<T>(id: string): Promise<T> {
    return await this.handleCall(
            () => lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}${USER_ENDPOINT}${id}`)),
            RestServices.DATABASE,
            'Busca de usuário realizada com sucesso',
            'Erro ao buscar usuário'
           );
   }

   public async getByEmail(email: string): Promise<UserAuth> {
        const GET_BY_EMAIL = `${this.baseUrl}${USER_ENDPOINT}getUserByEmail/${email}`;

        const result = await this.handleCall(
            () => lastValueFrom(this.httpClient.get<any>(GET_BY_EMAIL)),
            RestServices.DATABASE,
            'Busca de usuário realizada com sucesso',
            'Erro ao buscar usuário'
        );

        return {
            userId: result.data['userId'],
            name: result.data['name'],
            email: result.data['email'],
            photo: result.data['photo'],
            userType: result.data['userType'],
            address: {
                state: result.data['state'],
                city: result.data['city'],
                neighborhood: result.data['neighborhood'],
                street: result.data['street'],
                cep: result.data['cep'],
                streetNumber: result.data['streetNumber']
            }
        }
   }

   public async create<T = CreateUserFrontendDTO>(data: T): Promise<UserAuth> {
        const result = await this.handleCall(
             () => lastValueFrom(
                this.httpClient.post<any>(`${this.baseUrl}${USER_ENDPOINT}`, data)
            ),
            RestServices.DATABASE,
            'Usuário criado com sucesso',
            'Erro ao criar usuário'
        );

        return {
            userId: result.data['$id'],
            name: result.data['name'],
            email: result.data['email'],
            photo: result.data['photo'],
            userType: result.data['userType'],
            address: {
                state: result.data['state'],
                city: result.data['city'],
                neighborhood: result.data['neighborhood'],
                street: result.data['street'],
                cep: result.data['cep'],
                streetNumber: result.data['streetNumber']
            }
        }
   }
   
    public async login(email: string, password: string): Promise<UserAuth> {
        const result = await this.handleCall(
            () => lastValueFrom(this.httpClient.post<any>(`${this.baseUrl}${AUTH_ENDPOINT}login`, { email, password })),
            RestServices.DATABASE,
            'Login realizado com sucesso',
            'Erro ao realizar login'
        );

        return {
            userId: result.data['$id'],
            name: result.data['name'],
            email: result.data['email'],
            photo: result.data['photo'],
            userType: result.data['userType'],
            address: {
                state: result.data['state'],
                city: result.data['city'],
                neighborhood: result.data['neighborhood'],
                street: result.data['street'],
                cep: result.data['cep'],
                streetNumber: result.data['streetNumber']
            }
        }
    }
}