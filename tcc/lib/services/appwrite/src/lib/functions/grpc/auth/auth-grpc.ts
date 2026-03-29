import { Injectable } from '@angular/core';

import { 
  ExecutionMethod, 
  Functions 
} from 'appwrite';

import { 
  AppwriteServices, 
  AuthCsmsFunctionBody, 
  AuthenticationResponse,
  LogoutCsmsFunctionBody,
  LogoutResponse
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
    const response = JSON.parse(result.responseBody)?.reply || {};
    
    // Safely parse processedAt (handles ISO string or gRPC Timestamp object)
    const rawDate = response.processed_at || response.processedAt;
    let processedAt: Date;

    if (rawDate && typeof rawDate === 'object' && 'seconds' in rawDate) {
      processedAt = new Date(rawDate.seconds * 1000 + Math.floor((rawDate.nanos || 0) / 1000000));
    } else {
      processedAt = new Date(rawDate || Date.now());
    }

    return {
      success: !!(response.success),
      sessionId: response.session_id || response.sessionId || '',
      processedAt: processedAt,
      expiresAt: processedAt // Convenience alias
    } as any;
  }

  async logout(authBody: LogoutCsmsFunctionBody): Promise<LogoutResponse> {
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
      'Execução de logout gRPC realizada com sucesso',
      'Erro ao executar logout gRPC'
    );

    this.logger.info(`[${this.function}] Result: ${JSON.stringify(result.responseBody)}`);
    const response = JSON.parse(result.responseBody)?.reply || {};

    return {
      success: !!(response.success),
      sessionId: response.session_id || response.sessionId || '',
      processedAt: new Date(response.processed_at || response.processedAt || Date.now()),
      expiresAt: new Date(response.expires_at || response.expiresAt || Date.now())
    } as any;
  }
}
