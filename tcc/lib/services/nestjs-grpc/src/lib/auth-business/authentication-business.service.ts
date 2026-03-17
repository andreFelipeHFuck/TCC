import { Injectable } from "@nestjs/common";

import { AuthenticationResponse } from "@tcc/types";
import { AuthenticationBusiness } from "@tcc/models";

import { RedisStoreService } from "@tcc/redis";

@Injectable()
export class AuthenticationBusinessService {
    constructor(
        private readonly redisStoreService: RedisStoreService,
        private readonly authenticationBusiness: AuthenticationBusiness
    ) {}

    private async isActiveSession(sessionId: string): Promise<boolean> {
        if (!sessionId) {
            return false;
        }
        
        const session = await this.redisStoreService.getSession(sessionId);
        return !!session;
    }

    async createSession(incomingSessionId?: string): Promise<AuthenticationResponse> {


        
        // Se vier um sessionId (ex: extraído do JWT no gRPC), verificamos no Redis
        const active = incomingSessionId ? await this.isActiveSession(incomingSessionId) : false;
        
        // Geramos a sessão mantendo o ID se ele for válido e ativo
        const session = this.authenticationBusiness.generateSession(active, incomingSessionId);
    
        const sessionId = this.authenticationBusiness.getSessionId();
        const userData = this.authenticationBusiness.getAuthenticationResponse();

        await this.redisStoreService.saveSession(sessionId, userData);

        return session;
    }
}
  