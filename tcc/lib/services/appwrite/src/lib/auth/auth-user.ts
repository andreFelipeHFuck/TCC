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

  async create(user: User) {
    const { name, email, password, ...rest } = user;
    const result = await this.auth.create(name, email, password);
    return result;
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
}
