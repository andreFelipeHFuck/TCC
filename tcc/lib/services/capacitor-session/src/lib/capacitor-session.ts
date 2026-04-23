import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

import { 
  AuthenticationResponse, 
  UserLoggedIn 
} from '@tcc/types';

@Injectable({
  providedIn: 'root',
})
export class CapacitorSessionService {
  private readonly grpcSessionId: string = 'GRPC_SESSION_ID';
  private readonly apiRestSessionId: string = 'API_REST_SESSION_ID';

  /**
   * Armazena o ID da sessão de forma persistente.
   * @param sessionId O ID da sessão retornado pelo gRPC.
   */
  public async grpcSetSession(data: AuthenticationResponse): Promise<void> {
    await Preferences.set({
      key: this.grpcSessionId,
      value: JSON.stringify(data),
    });
  }

  public async apiRestSetSession(data: UserLoggedIn): Promise<void> {
    await Preferences.set({
      key: this.apiRestSessionId,
      value: JSON.stringify(data),
    });
  }

  /**
   * Recupera o ID da sessão armazenado.
   * @returns O ID da sessão ou null se não houver sessão.
   */
  public async grpcGetSession(): Promise<AuthenticationResponse | null> {
      const { value } = await Preferences.get({
        key: this.grpcSessionId,
      });

      if(value) {
        return JSON.parse(value);
      }

      return null;
  }

  public async apiRestGetSession(): Promise<UserLoggedIn | null> {
    const { value } = await Preferences.get({
      key: this.apiRestSessionId,
    });

    if(value) {
      return JSON.parse(value);
    }

    return null;
  }

  /**
   * Remove a sessão armazenada (ex: logout).
   */
  public async grpcRemoveSession(): Promise<void> {
    await Preferences.remove({
      key: this.grpcSessionId,
    });
  }

  public async apiRestRemoveSession(): Promise<void> {
    await Preferences.remove({
      key: this.apiRestSessionId,
    });
  }

  /**
   * Verifica se existe uma sessão armazenada.
   */
  public async grpcHasSession(): Promise<boolean> {
    const session = await this.grpcGetSession();
    return session !== null && session !== undefined;
  }

  public async apiRestHasSession(): Promise<boolean> {
    const session = await this.apiRestGetSession();
    return session !== null && session !== undefined;
  }

  /**
   * Limpa todo o cache (cuidado ao usar).
   */
  public async clearAll(): Promise<void> {
    await Preferences.clear();
  }
}
