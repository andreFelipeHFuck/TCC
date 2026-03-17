import { 
    Controller, 
    Inject, 
    Injectable, 
    UseGuards 
} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import {
    CsmsController,
    AuthenticationRequest,
    AuthenticationResponse
} from '@tcc/types'
import { ConsoleLogger } from '@tcc/utils';

import { AuthRpcGuard } from './authentication-business.guard';
import { AuthenticationBusinessService } from './authentication-business.service';

@Injectable()
@Controller()
export class AuthBusinessController {
    constructor(
        private readonly authService: AuthenticationBusinessService,
        @Inject('LOGGER_TOKEN') private readonly logger: ConsoleLogger
    ) {}

    private readonly controller = CsmsController.AUTH;

    @UseGuards(AuthRpcGuard)
    @GrpcMethod('AuthenticationService', 'SendAuthentication')
    async sendAuthentication(
        data: AuthenticationRequest & { decodedSessionId?: string }
    ): Promise<AuthenticationResponse> {
        this.logger.info(`[${this.controller.valueOf()}] Autenticando usuário: ${JSON.stringify(data)}`);

        // O sessionId foi extraído e validado pelo Guard (AuthRpcGuard)
        const sessionId = data.decodedSessionId;

        return await this.authService.createSession(sessionId);
    }
}
