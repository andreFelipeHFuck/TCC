import { Injectable } from '@angular/core';

import { 
  ExecutionMethod, 
  Functions 
} from 'appwrite';

import { 
  AppwriteServices, 
  AuthCsmsFunctionBody, 
  AuthenticationResponse
} from '@tcc/types';

import { Appwrite } from '../../../appwrite';

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

  async authSession(authBody: AuthCsmsFunctionBody): Promise<AuthenticationResponse> {
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

    this.logger.info(`[${this.function}] Result: ${JSON.stringify(result.responseBody)}`);
    const response = JSON.parse(result.responseBody)['reply'];
    return {
      success: response.success,
      sessionId: response.session_id,
      processedAt: new Date(response.processed_at)
    } as AuthenticationResponse;
  }
}
