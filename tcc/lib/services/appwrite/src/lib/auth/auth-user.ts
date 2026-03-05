import { inject, Injectable } from '@angular/core';


import {
  User,
  UserCreateDTO
} from '@tcc/types';
import { Auth } from './auth';
import { DatabaseUser } from '../database/database-user';

@Injectable({
  providedIn: 'root',
})
export class AuthUser {
  private readonly auth = inject(Auth);
  private readonly databaseUser = inject(DatabaseUser);

  async createUser(user: User) {
    const { name, email, password, ...rest } = user;

    try {
      await this.auth.create(name, email, password);
      const sessionLogin = await this.auth.login(email, password);

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
