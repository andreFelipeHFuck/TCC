import { v4 as uuidv4 } from 'uuid';

import {
    AuthenticationRequest,
    AuthenticationResponse,
    AuthCsmsFunctionBody,
    AuthType,
    LogoutCsmsFunctionBody
} from '@tcc/types';

export class AuthBusiness {
    private sessionId = '';

    private authenticationRequest: AuthenticationRequest | 'NONE' = 'NONE';
    private authenticationResponse: AuthenticationResponse | 'NONE' = 'NONE';

    public getAuthenticationRequest(): AuthenticationRequest | 'NONE' {
        return this.authenticationRequest;
    }

    public getAuthenticationResponse(): AuthenticationResponse | 'NONE' {
        return this.authenticationResponse;
    }

    public setAuthenticationResponse(authenticationResponse: AuthenticationResponse): void {
        this.authenticationResponse = authenticationResponse;
    }

    private generateSessionId(): void {
        if (this.sessionId === '') {
            this.sessionId = uuidv4();
        }
    }

    private convertToAuthCsmsFunctionBody(authenticationRequest: AuthenticationRequest): AuthCsmsFunctionBody | 'NONE' {
        if (
            !authenticationRequest.userSummary?.userId
            || !authenticationRequest.userSummary?.userName
            || !authenticationRequest.expiresAt
        ) {
            return 'NONE';
        }

        return {
            auth_type: authenticationRequest.authType,
            user_id: authenticationRequest.userSummary?.userId,
            user_name: authenticationRequest.userSummary?.userName,
            token: authenticationRequest.authToken,
            session_id: authenticationRequest.sessionId,
            expires_at: authenticationRequest.expiresAt.toISOString()
        }
    }

    public generateAuthenticationRequest(
        authType: AuthType,
        userId: string,
        userName: string,
        token: string,
        expiresAt: Date
    ): AuthCsmsFunctionBody | 'NONE' {
        if (this.authenticationRequest == 'NONE') {
            this.generateSessionId();
            this.authenticationRequest = {
                authType: authType.toString(),
                authToken: token,
                expiresAt: expiresAt,
                userSummary: {
                    userId: userId,
                    userName: userName
                },
                sessionId: this.sessionId
            };
        } else {
            this.authenticationRequest.authToken = token;
            this.authenticationRequest.expiresAt = expiresAt;
        }

        return this.convertToAuthCsmsFunctionBody(this.authenticationRequest);
    }

    public generateLogoutRequest( authType: AuthType, sessionId: string): LogoutCsmsFunctionBody | 'NONE' {
        if(sessionId === '') return 'NONE';

        return {
            auth_type: authType.toString(),
            session_id: sessionId
        }
    }
}
