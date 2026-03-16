import { 
    Controller, 
    Inject, 
    Injectable, 
    UseGuards 
} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { 
    Metadata, 
    ServerUnaryCall 
} from '@grpc/grpc-js';

import { AuthRpcGuard } from './authentication-business.guard';
import { ConsoleLogger } from '@tcc/utils';
import { AuthenticationBusinessService } from './authentication-business.service';

import {
    CsmsController,
    AuthenticationRequest,
    AuthenticationResponse
} from '@tcc/types'

@Injectable()
@Controller()
export class AuthBusinessController {
    constructor(
        private readonly authServic: AuthenticationBusinessService,
        @Inject('LOGGER_TOKEN') private readonly logger: ConsoleLogger
    ) {}

    private readonly controller = CsmsController.AUTH;

    @UseGuards(AuthRpcGuard)
    @GrpcMethod('AuthenticationService', 'SendAuthentication')
    sendAuthentication(
        data: AuthenticationRequest,
        metadata: Metadata,
        call: ServerUnaryCall<any, any>
    ): AuthenticationResponse {
        this.logger.info(`[${this.controller.valueOf()}] Autenticando usuário: ${JSON.stringify(data)}`);

    return {
      success: true,
      sessionId: `nest_sess_${Date.now()}`,
      processedAt: new Date(Date.now()),
    };
 }
}
