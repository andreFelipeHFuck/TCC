import { 
  Component, 
  inject, 
  signal 
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AuthUser } from '@tcc/appwrite';

import { MobilePage } from "@tcc/components/mobile-page"
import { Title } from '@tcc/components/title';
import { Button } from "@tcc/components/buttons"
import { AuthForm } from "@tcc/components/forms"

import { 
  FormResult, 
  Logger 
} from '@tcc/types';

@Component({
  selector: 'lib-auth',
  imports: [
    MobilePage,
    Title,
    Button,
    AuthForm,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
    private readonly authService = inject(AuthUser);
    private readonly logger = inject(Logger);

    public component = '[AUTH INTERFACE]';

    formResult = signal<FormResult>({email: '', password: ''});

    private validateForm(form: FormResult): boolean {
      if(!form) return false;

      if(!form.email || !form.password) return false;

      return true;
    }

    private login(email: string, password: string) {
      this.logger.info(`${this.component} Iniciando login...`);
      
      this.authService.login(email, password);

      this.logger.info(`${this.component} Login realizado com sucesso`);

      return true;
    }

    emitForm(form: FormResult){
      if(this.validateForm(form)){
        this.logger.info(`${this.component} Formulário obtido com sucesso: ${JSON.stringify(form)}`);
        this.login(form.email!, form.password!);
      } else {
        this.logger.error(`${this.component} Formulário inválido`);
      }
    }
}
