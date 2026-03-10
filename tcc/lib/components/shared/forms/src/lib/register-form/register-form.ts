import { 
  Component, 
  inject, 
  output
} from '@angular/core';
import { 
  FormBuilder,
  FormControl, 
  FormGroup, 
  ReactiveFormsModule, 
  Validators
} from '@angular/forms';

import { User } from '@tcc/types';

import { Input } from '../shared/input/input';
import { Button } from '@tcc/components/buttons';

@Component({
  selector: 'lib-register-form',
  imports: [
    ReactiveFormsModule,
    Input, 
    Button
  ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
})
export class RegisterForm {
  private fb: FormBuilder = inject(FormBuilder);

  formResult = output<User>();

  registerForm: FormGroup = this.fb.group({
      user: this.fb.group({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
      })
  });

  nameControl() {
    const userGroup = this.registerForm.controls['user'] as FormGroup;
    return userGroup.controls['name'] as FormControl;
  }

  emailControl() {
    const userGroup = this.registerForm.controls['user'] as FormGroup;
    return userGroup.controls['email'] as FormControl;
  }

  passwordControl() {
    const userGroup = this.registerForm.controls['user'] as FormGroup;
    return userGroup.controls['password'] as FormControl;
  }

  confirmPasswordControl() {
    const userGroup = this.registerForm.controls['user'] as FormGroup;
    return userGroup.controls['confirmPassword'] as FormControl;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const value = this.registerForm.value;
      this.formResult.emit(value);
    }
  }
}
