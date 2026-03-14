import { Injectable } from '@angular/core';

import { AppwriteServices } from '@tcc/types';

import { Appwrite } from '../../../appwrite';
import { Functions } from 'appwrite';
import { AuthCsmsFunctionBody } from 'lib/types/src/lib/csms/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGrpc extends Appwrite {
  private functionId = '69a6e7d2e94aa809e9ef';

  constructor() {
    super();
    this.service = AppwriteServices.FUNCTIONS;
  }

  async authSession(authBody: AuthCsmsFunctionBody) {
    const body: string = JSON.stringify(authBody);

    return await this.handleCall(
      this.getFunctions(),
      (functions: Functions) => functions.createExecution(
        this.functionId,
        body
      ),
      this.service,
      'Execução de autenticação gRPC realizada com sucesso',
      'Erro ao executar autenticação gRPC'
    );
  }
}
