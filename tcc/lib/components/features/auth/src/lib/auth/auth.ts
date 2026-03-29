import { 
  Component, 
  inject
} from '@angular/core';
import { Router } from '@angular/router';

import { Button } from '@tcc/components/buttons';
import { AuthForm } from '@tcc/components/forms';
import { MobilePage } from '@tcc/components/mobile-page';
import { Title } from '@tcc/components/title';
import { AUTH_SERVICE, FormResult, Logger } from '@tcc/types';

@Component({
  selector: 'lib-auth',
  imports: [
    MobilePage,
    Title,
    Button,
    AuthForm
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
    private readonly authService = inject(AUTH_SERVICE);
    private readonly logger = inject(Logger);
    private readonly router = inject(Router);

    public component = '[AUTH INTERFACE]';

    private validateForm(form: FormResult): boolean {
      if(!form) return false;

      if(!form.email || !form.password) return false;

      return true;
    }

    private async login(email: string, password: string) {
      this.logger.info(`${this.component} Iniciando login...`);
      
      const login = await this.authService.login(email, password);

      this.logger.info(`${this.component} Login realizado com sucesso`);
      this.router.navigate(['/']);
    }

    async emitForm(form: FormResult){
      if(this.validateForm(form)){
        this.logger.info(`${this.component} Formulário obtido com sucesso: ${JSON.stringify(form)}`);
        await this.login(form.email!, form.password!);
      } else {
        this.logger.error(`${this.component} Formulário inválido`);
      }
    }
}
