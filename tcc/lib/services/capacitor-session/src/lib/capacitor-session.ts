import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

import { AuthenticationResponse } from '@tcc/types';

@Injectable({
  providedIn: 'root',
})
export class CapacitorSessionService {
  private readonly sessionId: string = 'SESSION_ID';

  /**
   * Armazena o ID da sessão de forma persistente.
   * @param sessionId O ID da sessão retornado pelo gRPC.
   */
  public async setSession(data: AuthenticationResponse): Promise<void> {
    await Preferences.set({
      key: this.sessionId,
      value: JSON.stringify(data),
    });
  }

  /**
   * Recupera o ID da sessão armazenado.
   * @returns O ID da sessão ou null se não houver sessão.
   */
  public async getSession(): Promise<AuthenticationResponse | null> {
      const { value } = await Preferences.get({
        key: this.sessionId,
      });

      if(value) {
        return JSON.parse(value);
      }

      return null;
  }

  /**
   * Remove a sessão armazenada (ex: logout).
   */
  public async removeSession(): Promise<void> {
    await Preferences.remove({
      key: this.sessionId,
    });
  }

  /**
   * Verifica se existe uma sessão armazenada.
   */
  public async hasSession(): Promise<boolean> {
    const session = await this.getSession();
    return session !== null && session !== undefined;
  }

  /**
   * Limpa todo o cache (cuidado ao usar).
   */
  public async clearAll(): Promise<void> {
    await Preferences.clear();
  }
}
