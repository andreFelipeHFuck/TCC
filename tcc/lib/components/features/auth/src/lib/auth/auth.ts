import { Component, inject } from '@angular/core';

import { Title } from '@tcc/components/title';
import { Button } from "@tcc/components/buttons"
import { AuthForm } from "@tcc/components/forms"
import { Logger } from '@tcc/types';

@Component({
  selector: 'lib-auth',
  imports: [
    Title,
    Button,
    AuthForm
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
    private readonly logger = inject(Logger);

    emitirForm(form: any){
      this.logger.info('Formulario enviado com sucesso' + form);
    }
}
