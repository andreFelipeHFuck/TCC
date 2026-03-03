import { v4 as uuidv4 } from 'uuid';

import { 
    AuthenticationRequest,
    AuthenticationResponse,
    UserSummary,
    User
} from '@tcc/types';

export class AuthBusiness {

    constructor(
        readonly user: User
    ) {}

    private generateAuthenticationToken(): string {
        return uuidv4();
    }

    private generateUserSummary(): UserSummary {
        const { $id, name } = this.user;
        return {
            userId: $id,    
            userName:name
        };
    }

    public generateAuthenticationRequest(): AuthenticationRequest {
        const authToken: string = this.generateAuthenticationToken();
        const request: AuthenticationRequest = {
            authToken,
            expiresAt: new Date(Date.now() + 3600 * 1000), // Token válido por 1 hora
            userSummary: this.generateUserSummary()
        };

        return request;
    }
}