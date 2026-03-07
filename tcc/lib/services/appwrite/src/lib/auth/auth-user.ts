import { inject, Injectable } from '@angular/core';


import {
  Logger,
  User,
  UserCreateDTO
} from '@tcc/types';
import { Auth } from './auth';
import { DatabaseUser } from '../database/database-user';
import { appwriteUserToUserCreateDTO } from '@tcc/appwrite-adapter';

@Injectable({
  providedIn: 'root',
})
export class AuthUser {
  private readonly auth = inject(Auth);
  private readonly databaseUser = inject(DatabaseUser);
  private readonly logger = inject(Logger);

  protected service: string = '[APPWRITE USER AUTH SERVICE]'

  async createUser(user: User) {
    const userCreateDTO: UserCreateDTO = appwriteUserToUserCreateDTO(user);

    await this.auth.create(userCreateDTO.name, userCreateDTO.email, userCreateDTO.password);
    const sessionLogin = await this.auth.login(userCreateDTO.email, userCreateDTO.password);

    const dados = await this.auth.get()
    this.logger.info('DADOS:' + JSON.stringify(dados));
    await this.databaseUser.create(userCreateDTO);

    this.login(userCreateDTO.email, userCreateDTO.password)

    return sessionLogin;
  }

  login(email: string, password: string) {
    console.log(this.service + 'Login no Banco de Dados');
    const result = this.databaseUser.login(email, password);

    console.log(result);
  }

  // logout() {
  //   this.auth.logout();
  // }
}
