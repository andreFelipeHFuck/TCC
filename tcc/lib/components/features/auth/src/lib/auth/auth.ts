import { 
  Component, 
  inject
} from '@angular/core';
import { 
  Router, 
  RouterLink 
} from '@angular/router';

import { Mobile } from '@tcc/components/mobile';
import { Button } from '@tcc/components/buttons';
import { AuthForm } from '@tcc/components/forms';
import { MobilePage } from '@tcc/components/mobile-page';
import { Title } from '@tcc/components/title';
import { 
  AUTH_SERVICE, 
  FormResult, 
  Logger 
} from '@tcc/types';
import { AuthThumb } from './auth-thumb/auth-thumb';

@Component({
  selector: 'lib-auth',
  imports: [
    MobilePage,
    Title,
    Button,
    AuthForm,
    RouterLink,
    AuthThumb
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
    private readonly authService = inject(AUTH_SERVICE);
    private readonly logger = inject(Logger);
    private readonly router = inject(Router);
    
    public readonly mobile = inject(Mobile);

    public component = '[AUTH INTERFACE]';

    private validateForm(form: FormResult): boolean {
      if(!form) return false;

      if(!form.email || !form.password) return false;

      return true;
    }

    private async login(email: string, password: string) {
      this.logger.info(`${this.component} Iniciando login...`);
      
      await this.authService.login(email, password);

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
