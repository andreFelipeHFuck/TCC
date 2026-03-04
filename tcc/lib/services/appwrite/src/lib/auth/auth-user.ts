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

  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
}
