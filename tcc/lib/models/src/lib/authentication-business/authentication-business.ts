import { AuthenticationResponse } from '@tcc/types'

export class AuthenticationBusiness {
    constructor(
        private authenticationResponse: AuthenticationResponse
    ) {}

    public getAuthenticationResponse(): AuthenticationResponse {
        return this.authenticationResponse;
    }

    public getSuccess(): boolean {
        return this.authenticationResponse.success;
    }

    public getSessionId(): string {
        return this.authenticationResponse.sessionId;
    }

    public getProcessedAt(): Date | undefined {
        return this.authenticationResponse.processedAt;
    }

    public setAuthenticationResponse(authenticationResponse: AuthenticationResponse) {
        this.authenticationResponse = authenticationResponse;
    }

    private generateSessionId(): string {
        return `nest_sess_${Date.now()}`;
    }

    private generateProcessedAt(): Date {
        return new Date(Date.now());
    }

    public generateSession(success: boolean): AuthenticationResponse {
        const authenticationResponse: AuthenticationResponse = {
            success: success,
            sessionId: this.generateSessionId(),
            processedAt: this.generateProcessedAt(),
        };

        this.setAuthenticationResponse(authenticationResponse);

        return authenticationResponse;
    }
}