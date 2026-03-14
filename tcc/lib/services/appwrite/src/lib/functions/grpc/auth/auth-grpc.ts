import { Injectable } from '@angular/core';

import { 
  ExecutionMethod, 
  Functions 
} from 'appwrite';

import { AppwriteServices } from '@tcc/types';

import { Appwrite } from '../../../appwrite';
import { AuthCsmsFunctionBody } from 'lib/types/src/lib/csms/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGrpc extends Appwrite {
  private functionId = '69a6d85800289f4983da';
  private readonly function = 'APPWRITE CSMS AUTH FUNCTION'

  constructor() {
    super();
    this.service = AppwriteServices.FUNCTIONS;
  }

  async authSession(authBody: AuthCsmsFunctionBody) {
    const body: string = JSON.stringify(authBody);

    this.logger.info(`[${this.function}] Body: ${body}`);

    const result = await this.handleCall(
      this.getFunctions(),
      (functions: Functions) => functions.createExecution(
        this.functionId,
        body,
        false,
        '/',
        ExecutionMethod.POST,
        {
          'Content-Type': 'application/json'
        }
      ),
      this.service,
      'Execução de autenticação gRPC realizada com sucesso',
      'Erro ao executar autenticação gRPC'
    );

    this.logger.info(`[${this.function}] Result: ${JSON.stringify(result)}`);
  }
}
