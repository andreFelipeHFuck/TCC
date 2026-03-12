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
import { 
  AddressForm,
  RegisterForm, 
  RegisterService 
} from '@tcc/components/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-register',
  imports: [
    ReactiveFormsModule,
    MobilePage,
    Title,
    Button,
    RegisterForm,
    AddressForm
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private readonly authService = inject(AuthUser);
  public readonly registerService = inject(RegisterService);
  private readonly logger = inject(Logger);

  public component = '[REGISTER INTERFACE]';

  formResult = signal<string>("");

  emitForm(form: any) {
    this.formResult.set(form);
  }
}
