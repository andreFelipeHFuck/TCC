import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

import { 
    AuthenticationRequest, 
    CsmsGuards 
} from '@tcc/types'
import { ConsoleLogger } from '@tcc/utils';

@Injectable()
export class AuthRpcGuard implements CanActivate {
    constructor(
        @Inject('LOGGER_TOKEN') private readonly logger: ConsoleLogger
    ) {}

    private readonly guard = CsmsGuards.AUTH;

    canActivate(context: ExecutionContext): boolean  {
        const rpcContext = context.switchToRpc();
        const data = rpcContext.getData<AuthenticationRequest>();

        // 1. Validar Token
        /**
         * @todo a verificação deve comprovar que é um JWS válido
         */
        if (!data.authToken || data.authToken.length < 1) {
        throw new RpcException({
            code: status.INVALID_ARGUMENT,
            message: 'Token de autenticação ausente ou inválido.',
        });
        }

        /**
         * @todo realizar uma verificação completa dos dados do usuário
         */
        if (!data.userSummary?.userId) {
        throw new RpcException({
            code: status.FAILED_PRECONDITION,
            message: 'UserSummary incompleto na requisição.',
        });
        }

        if (data.expiresAt && data.expiresAt < new Date()) {
            this.logger.warn(`${this.guard.valueOf}: Token expirado para usuário: ${data.userSummary.userName}`);
            throw new RpcException({
                code: status.UNAUTHENTICATED,
                message: 'O token enviado já expirou.',
            });
        }

        return true; // Requisição autorizada a prosseguir
    }
}