import { 
  Component, 
  inject, 
  output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Logger } from '@tcc/types';
import { Input } from '../shared/input/input';
import { Button } from '@tcc/components/buttons';

@Component({
  selector: 'lib-auth-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    Input,
    Button
  ],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.scss',
})
export class AuthForm {
  private readonly logger: Logger = inject(Logger);

  formResult = output<Partial<{
    email: string | null;
    password: string | null;
}>>();

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
      this.logger.info(JSON.stringify(this.authForm.value));

      const value = this.authForm.value;
      this.formResult.emit(value);
    }
  }
}
