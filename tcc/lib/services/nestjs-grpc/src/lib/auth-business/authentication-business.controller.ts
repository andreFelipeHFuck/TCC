import { 
    Controller, 
    Inject, 
    Injectable, 
    UseGuards 
} from '@nestjs/common';

import { 
    GrpcMethod, 
    RpcException 
} from '@nestjs/microservices';
import { 
    Metadata, 
    ServerUnaryCall 
} from '@grpc/grpc-js';
import { status } from '@grpc/grpc-js';

import { AuthRpcGuard } from './authentication-business.guard';

import {
    AuthenticationRequest,
    AuthenticationResponse
} from '@tcc/types'
import { ConsoleLogger } from '@tcc/utils';
import { json } from 'stream/consumers';


@Injectable()
@Controller()
export class AuthBusinessController {
    constructor(
        @Inject('LOGGER_TOKEN') private readonly logger: ConsoleLogger
    ) {}

    @UseGuards(AuthRpcGuard)
    @GrpcMethod('AuthenticationService', 'SendAuthentication')
    sendAuthentication(
        data: AuthenticationRequest,
        metadata: Metadata,
        call: ServerUnaryCall<any, any>
    ): AuthenticationResponse {
        this.logger.info(`[RPC AUTH BUSINESS] Autenticando usuário: ${JSON.stringify(data)}`);

    return {
      success: true,
      sessionId: `nest_sess_${Date.now()}`,
      processedAt: new Date(),
    };
    }
}
