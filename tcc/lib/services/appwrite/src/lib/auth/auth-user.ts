import { inject, Injectable } from '@angular/core';


import {
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

  async createUser(user: User) {
    const userCreateDTO: UserCreateDTO = appwriteUserToUserCreateDTO(user);

    await this.auth.create(userCreateDTO.name, userCreateDTO.email, userCreateDTO.password);
    const sessionLogin = await this.auth.login(userCreateDTO.email, userCreateDTO.password);
    await this.databaseUser.create(userCreateDTO);

    return sessionLogin;
  }

  // login() {
  //   this.auth.login();
  // }

  // logout() {
  //   this.auth.logout();
  // }
}
