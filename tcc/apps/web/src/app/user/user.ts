import { Component, computed, inject, signal } from '@angular/core';

import { AppwriteError, User as UserType } from '@tcc/types';
import { APPWRITE_DATABASE_ID, AuthUser, DatabaseUser } from '@tcc/appwrite';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  private readonly authUser: AuthUser = inject(AuthUser);

  messageError = signal<string>('');

  isError = computed(() => this.messageError().length > 0);

  public async createUser(): Promise<void> {
    // console.log(`[APP USER] criação de usuário: ${this.databaseId}`);

    const user: UserType = {
      $id: '',
      name: 'Teste Database',
      email: 'test@example.com',
      password: 'password123',
      photo: 'https://example.com/photo.jpg',
      userType: 'driver',
      address: {
        state: 'SP',
        city: 'São Paulo',
        neighborhood: 'Jardins',
        street: 'Rua Teste',
        cep: '12345678',
        streetNumber: 123
      }
    };


    const result = await this.authUser.createUser(user);

    console.log(`[APP USER] criação de usuário: ${result}`);
  }

  public async getUser() {
    const id: string = '69b2275a00325ce161dd';

    const result = await this.authUser.getUser(id);

    this.messageError.set(JSON.stringify(result));

  }
}
