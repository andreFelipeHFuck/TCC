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
  Logger,
  User 
} from '@tcc/types';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private readonly component = '[REGISTER SERVICE]';

  private fb: FormBuilder = inject(FormBuilder);

  private readonly logger = inject(Logger);

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
        streetNumber: new FormControl('', [
          Validators.required
        ])
      })
  });

  private formToUser(form: FormGroup): User {
    return {
      userId: '',
      name: form.get('user')?.get('name')?.value,
      email: form.get('user')?.get('email')?.value,
      password: form.get('user')?.get('password')?.value,
      photo: '',
      userType: 'driver',
      address: {
        cep: form.get('address')?.get('cep')?.value,
        state: form.get('address')?.get('state')?.value,
        city: form.get('address')?.get('city')?.value,
        neighborhood: form.get('address')?.get('neighborhood')?.value,
        street: form.get('address')?.get('street')?.value,
        streetNumber: Number(form.get('address')?.get('streetNumber')?.value)
      }
    };
  }

  onSubmit() {
    this.logger.info(`${this.component} Formulário obtido com sucesso: ${JSON.stringify(this.registerForm.value)}`);

    if (this.registerForm.valid) {
      const user: User = this.formToUser(this.registerForm);

      this.logger.info(`${this.component} Formulário convertido para User: ${JSON.stringify(user)}`);
      
      this.formResult.next(user);
    }
  }
}
