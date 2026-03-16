import { Injectable } from "@nestjs/common";

import { AuthenticationResponse } from "@tcc/types";

import { RedisStoreService } from "@tcc/redis";

@Injectable()
export class AuthenticationBusinessService {
    constructor(
        private readonly redisStoreService: RedisStoreService
    ) {}

    private validateUser(): boolean {
        return true;
    }

    private generateSessionId(): string {
        return new Date(Date.now()).toISOString();
    }

    private async generateSession(): Promise<AuthenticationResponse> {
        return {
            success: true,
            sessionId: `nest_sess_${Date.now()}`,
            processedAt: new Date(Date.now()),
        };
    }

    async createSession(): Promise<AuthenticationResponse> {
        return {
            success: true,
            sessionId: `nest_sess_${Date.now()}`,
            processedAt: new Date(Date.now()),
        };
    }

}
  