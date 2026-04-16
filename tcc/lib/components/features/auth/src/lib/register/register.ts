import {
  Component, 
  inject, 
  signal, 
  OnInit,
  DestroyRef
} from '@angular/core';
import { Router } from '@angular/router';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { 
  Logger, 
  User,
  AUTH_SERVICE
} from '@tcc/types';

import { Mobile } from '@tcc/components/mobile';
import { DesktopPage } from '@tcc/components/desktop-page';

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
    AddressForm,
    DesktopPage
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  
  private readonly authService = inject(AUTH_SERVICE);
  public readonly registerService = inject(RegisterService);
  private readonly logger = inject(Logger);

  public readonly mobile = inject(Mobile);

  public component = '[REGISTER INTERFACE]';

  formResult = signal<string>("");

  private validateForm(form: User): boolean
   {
    if(!form) return false;
    if(!form.address) return false;

    return true;
  }

  private async create(user: User) {
    this.logger.info(`${this.component} Iniciando cadastro do usuário ...`);

    await this.authService.createUser(user);

    this.logger.info(`${this.component} Cadastro do usuário concluído com sucesso`);
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.registerService.formResult
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user: User) => {
         this.handleFormResult(user);
      });
  }

  private handleFormResult(user: User) {
    if (this.validateForm(user)) {
      this.logger.info(`${this.component} Formulário obtido com sucesso: ${JSON.stringify(user)}`);
      this.create(user);
    } else {
      this.logger.error(`${this.component} Formulário inválido`);
    }
  }
}
