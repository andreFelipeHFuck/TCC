import {
  Component, 
  inject, 
  signal 
} from '@angular/core';

import { AuthUser } from '@tcc/appwrite';
import { Logger } from '@tcc/types';

import { MobilePage } from '@tcc/components/mobile-page';
import { Title } from '@tcc/components/title';
import { Button } from '@tcc/components/buttons';
import { RegisterForm } from '@tcc/components/forms';

@Component({
  selector: 'lib-register',
  imports: [
    MobilePage,
    Title,
    Button,
    RegisterForm
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private readonly authService = inject(AuthUser);
  private readonly logger = inject(Logger);

  public component = '[REGISTER INTERFACE]';

  formResult = signal<string>("");

  emitForm(form: any) {
    this.formResult.set(form);
  }
}
