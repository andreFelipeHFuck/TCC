import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

import { AuthenticationRequest } from '@tcc/types'

@Injectable()
export class AuthRpcGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean  {
        const rpcContext = context.switchToRpc();
        const data = rpcContext.getData<AuthenticationRequest>();

        // 1. Validar Token
        if (!data.authToken || data.authToken.length < 10) {
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
        throw new RpcException({
            code: status.UNAUTHENTICATED,
            message: 'O token enviado já expirou.',
        });
        }

        return true; // Requisição autorizada a prosseguir
    }
}