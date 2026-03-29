import { JsonPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';

import { AUTH_SERVICE } from '@tcc/types';
import { CsmsSystem } from '@tcc/core';

@Component({
  selector: 'app-user',
  imports: [
    JsonPipe
  ],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  private readonly authService = inject(AUTH_SERVICE);
  private readonly csmsSystem = inject(CsmsSystem);

  messageError = signal<string>('');
  user = signal<any>(null);

  isError = computed(() => this.messageError().length > 0);

  public async initSession() {
    await this.csmsSystem.initSession();
  }

  public async finishSession() {
    await this.csmsSystem.finishSession();
  }
}
