import { v4 as uuidv4 } from 'uuid';

import { AuthenticationResponse } from '@tcc/types'

export class AuthenticationBusiness {
    constructor(
        private sender = false,
    ) {
    }

    private authenticationResponse: AuthenticationResponse | null = null;

    public getAuthenticationResponse(): AuthenticationResponse | null {
        if(!this.authenticationResponse) {
            throw new Error('Error Inválido');
        }
        return this.authenticationResponse;
    }

    public getSuccess(): boolean {
        if(!this.authenticationResponse) {
            throw new Error('Error Inválido');
        }
        return this.authenticationResponse.success;
    }

    public getSessionId(): string {
        if(!this.authenticationResponse) {
            throw new Error('Error Inválido');
        }
        return this.authenticationResponse.sessionId;
    }

    public getProcessedAt(): Date | undefined {
        if(!this.authenticationResponse) {
            throw new Error('Error Inválido');
        }
        return this.authenticationResponse.processedAt;
    }

    public getAuthToken(): string {
        if(!this.authenticationResponse) {
            throw new Error('Error Inválido');
        }
        return this.authenticationResponse.authToken;
    }

    public setAuthenticationResponse(authenticationResponse: AuthenticationResponse) {
        this.authenticationResponse = authenticationResponse;
    }

    private generateSessionId(): string {
        return `nest_sess_${uuidv4()}`;
    }

    private generateProcessedAt(timestamp: number): Date {
        return new Date(Date.now() + timestamp);
    }

    public generateSession(success: boolean, sessionId?: string): AuthenticationResponse {
        if(!this.sender) {
            const authenticationResponse: AuthenticationResponse = {
                success: success,
                sessionId: sessionId ?? this.generateSessionId(),
                processedAt: this.generateProcessedAt(1000),
                authToken: '',
            };
    
            this.setAuthenticationResponse(authenticationResponse);
    
            return authenticationResponse;
        }

        throw new Error('Error Inválido');
    }
}
