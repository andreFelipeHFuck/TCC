import { 
  Injectable,
  inject
} from '@angular/core';

import { 
  FormBuilder, 
  FormControl, 
  FormGroup, 
  Validators
} from '@angular/forms';

import { 
  User 
} from '@tcc/types';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private fb: FormBuilder = inject(FormBuilder);

  formResult = new Subject<User>();
  
   registerForm: FormGroup = this.fb.group({
      user: this.fb.group({
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(3)
        ]),
        email: new FormControl('', [
          Validators.required, 
          Validators.email
        ]),
        password: new FormControl('', [
          Validators.required, 
          Validators.minLength(6)
        ]),
        confirmPassword: new FormControl('', [
          Validators.required, 
          Validators.minLength(6)
        ])
      }),
      address: this.fb.group({
        cep: new FormControl('', [
          Validators.required, 
          Validators.minLength(8), 
          Validators.maxLength(8)
        ]),
        state: new FormControl('', [
          Validators.required,
          Validators.minLength(3)
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(3)
        ]),
        neighborhood: new FormControl('', [
          Validators.required,
          Validators.minLength(3)
        ]),
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(3)
        ]),
        numStreet: new FormControl('', [
          Validators.required
        ])
      })
  });

  onSubmit() {
    if (this.registerForm.valid) {
      const value = this.registerForm.value as User;
      this.formResult.next(value);
    }

  }

 

  
}
