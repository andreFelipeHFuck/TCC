import { 
  Component, 
  inject, 
  output
} from '@angular/core';
import { 
  FormControl, 
  FormGroup
} from '@angular/forms';

import { User } from '@tcc/types';

import { RegisterService } from '../services/register-service';

import { Input } from '../shared/input/input';
import { Button } from '@tcc/components/buttons';

@Component({
  selector: 'lib-register-form',
  imports: [
    Input, 
    Button
  ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
})
export class RegisterForm {
  private registerService = inject(RegisterService);

  formResult = output<User>();

   nameControl() {
    const userGroup = this.registerService.registerForm.controls['user'] as FormGroup;
    return userGroup.controls['name'] as FormControl;
  }

  emailControl() {
    const userGroup = this.registerService.registerForm.controls['user'] as FormGroup;
    return userGroup.controls['email'] as FormControl;
  }

  passwordControl() {
    const userGroup = this.registerService.registerForm.controls['user'] as FormGroup;
    return userGroup.controls['password'] as FormControl;
  }

  confirmPasswordControl() {
    const userGroup = this.registerService.registerForm.controls['user'] as FormGroup;
    return userGroup.controls['confirmPassword'] as FormControl;
  }
}
