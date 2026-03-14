import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

import { AuthenticationRequest } from '@tcc/types'
import { ConsoleLogger } from '@tcc/utils';

@Injectable()
export class AuthRpcGuard implements CanActivate {
    constructor(
        @Inject('LOGGER_TOKEN') private readonly logger: ConsoleLogger
    ) {}

    canActivate(context: ExecutionContext): boolean  {
        const rpcContext = context.switchToRpc();
        const data = rpcContext.getData<AuthenticationRequest>();

        // 1. Validar Token
        if (!data.authToken || data.authToken.length < 1) {
        throw new RpcException({
            code: status.INVALID_ARGUMENT,
            message: 'Token de autenticação ausente ou inválido.',
        });
        }

        // 2. Validar Estrutura do Usuário
        if (!data.userSummary?.userId) {
        throw new RpcException({
            code: status.FAILED_PRECONDITION,
            message: 'UserSummary incompleto na requisição.',
        });
        }

        // 3. Validar Expiração (Data)
        if (data.expiresAt && data.expiresAt < new Date()) {
            this.logger.warn(`[RPC AUTH BUSINESS] Token expirado para usuário: ${data.userSummary.userName}`);
            throw new RpcException({
                code: status.UNAUTHENTICATED,
                message: 'O token enviado já expirou.',
            });
        }

        return true; // Requisição autorizada a prosseguir
    }
}