import { Component, computed, inject, signal } from '@angular/core';

import { User as UserType } from '@tcc/types';

import { 
  AuthUser,
  AuthCsms
} from '@tcc/appwrite';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  private readonly authCsms: AuthCsms = inject(AuthCsms);

  messageError = signal<string>('');

  isError = computed(() => this.messageError().length > 0);

  public async initSession() {
    this.authCsms.initSessionProxy();
  }
}
