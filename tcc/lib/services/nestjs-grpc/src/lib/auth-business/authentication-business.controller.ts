import { 
    Controller, 
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


@Controller()
export class AuthBusinessController {
    @UseGuards(AuthRpcGuard)
    @GrpcMethod('AuthenticationService', 'SendAuthentication')
    sendAuthentication(
        data: AuthenticationRequest,
        metadata: Metadata,
        call: ServerUnaryCall<any, any>
    ): AuthenticationResponse {
        console.log(`Recebido auth para: ${data.userSummary?.userName}`);

    return {
      success: true,
      sessionId: `nest_sess_${Date.now()}`,
      processedAt: new Date(),
    };
    }
}