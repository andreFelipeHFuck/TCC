import { 
  Component, 
  output
} from '@angular/core';
import { 
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { FormResult } from '@tcc/types';
import { Input } from '../shared/input/input';
import { Button } from '@tcc/components/buttons';

@Component({
  selector: 'lib-auth-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    Input,
    Button
  ],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.scss',
})
export class AuthForm {
  formResult = output<FormResult>();

  hidePassword = true;

  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  get emailControl() {
    return this.authForm.controls.email;
  }

  get passwordControl() {
    return this.authForm.controls.password;
  }

  onSubmit() {
    if (this.authForm.valid) {
      const value = this.authForm.value as FormResult;
      this.formResult.emit(value);
    }
  }
}
