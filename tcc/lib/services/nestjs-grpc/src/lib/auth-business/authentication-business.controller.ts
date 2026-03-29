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
    AuthenticationResponse,
    LogoutRequest,
    LogoutResponse
} from '@tcc/types'
import { ConsoleLogger } from '@tcc/utils';

import { AuthRpcGuard, LogoutRpcGuard } from './authentication-business.guard';
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
        data: AuthenticationRequest
    ): Promise<AuthenticationResponse> {

        return await this.authService.createSession(data);
    }

    @UseGuards(LogoutRpcGuard)
    @GrpcMethod('AuthenticationService', 'Logout')
    async logout(
        data: LogoutRequest
    ): Promise<LogoutResponse> {
        return await this.authService.logout(data);
    }
}
