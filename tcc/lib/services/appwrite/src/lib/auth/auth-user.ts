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

    try {
      await this.auth.create(userCreateDTO.name, userCreateDTO.email, userCreateDTO.password);
      const sessionLogin = await this.auth.login(userCreateDTO.email, userCreateDTO.password);

      return sessionLogin;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // login() {
  //   this.auth.login();
  // }

  // logout() {
  //   this.auth.logout();
  // }
}
