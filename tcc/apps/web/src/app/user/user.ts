import { JsonPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';

import { 
  AuthUser,
  AuthCsms
} from '@tcc/appwrite';

@Component({
  selector: 'app-user',
  imports: [
    JsonPipe
  ],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  private readonly authUser: AuthUser = inject(AuthUser);
  private readonly authCsms: AuthCsms = inject(AuthCsms);

  messageError = signal<string>('');
  user = signal<any>(null);

  isError = computed(() => this.messageError().length > 0);

  public async getUser() {
    const user = await this.authUser.getUser();
    this.user.set(user);
  }

  public async initSession() {
    this.authCsms.initSession();
  }
}
