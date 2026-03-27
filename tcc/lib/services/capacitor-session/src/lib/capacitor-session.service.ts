import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

import { 
  AuthenticationResponse, 
  SessionId 
} from '@tcc/types';

@Injectable({
  providedIn: 'root',
})
export class CapacitorSessionService {
  private sessionId: SessionId = 'NONE';

  private setSessionId(sessionId: string): void {
    if (
      sessionId === 'NONE' ||
      sessionId === '' ||
      sessionId === null ||
      sessionId === undefined
    ) {
      this.sessionId = 'NONE';
    } else {
      this.sessionId = sessionId;
    }
  }

  /**
   * Armazena o ID da sessão de forma persistente.
   * @param sessionId O ID da sessão retornado pelo gRPC.
   */
  public async setSession(sessionId: string, data: AuthenticationResponse): Promise<void> {
    this.setSessionId(sessionId);

    if(this.sessionId !== 'NONE'){
      await Preferences.set({
        key: sessionId,
        value: JSON.stringify(data),
      });
    }
  }

  /**
   * Recupera o ID da sessão armazenado.
   * @returns O ID da sessão ou null se não houver sessão.
   */
  public async getSession(): Promise<AuthenticationResponse | 'NONE'> {
    if(this.sessionId !== 'NONE') {
      const { value } = await Preferences.get({
        key: this.sessionId,
      });

      if(value) {
        return JSON.parse(value);
      }
    }
    return 'NONE';
  }

  /**
   * Remove a sessão armazenada (ex: logout).
   */
  public async removeSession(): Promise<void> {
    if(this.sessionId !== 'NONE') {
      await Preferences.remove({
        key: this.sessionId,
      });
      this.setSessionId('NONE');
    }
  }

  /**
   * Verifica se existe uma sessão armazenada.
   */
  public async hasSession(): Promise<boolean> {
    const session = await this.getSession();
    return session !== 'NONE';
  }

  /**
   * Limpa todo o cache (cuidado ao usar).
   */
  public async clearAll(): Promise<void> {
    await Preferences.clear();
  }
}
