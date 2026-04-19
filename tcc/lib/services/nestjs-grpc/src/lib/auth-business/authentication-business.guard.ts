import * as dotenv from 'dotenv';
dotenv.config();

/**
 * @todo criar um serviço para o backend para o SDK do Appwrite que possa fazer validar o JWS
 * @todo criar um serviço agnostico para BaaS para poder validar tanto usando Appwrite quanto Firebase
 */

import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { status } from '@grpc/grpc-js';

import * as sdk from 'node-appwrite';

import { 
    AuthenticationRequest, 
    CsmsGuards,
    LogoutRequest
} from '@tcc/types'
import { ConsoleLogger } from '@tcc/utils';

@Injectable()
export class AuthRpcGuard implements CanActivate {
    constructor(
        @Inject('LOGGER_TOKEN') private readonly logger: ConsoleLogger,
        private readonly configService: ConfigService
    ) {}

    private readonly guard = CsmsGuards.AUTH;

    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const rpcContext = context.switchToRpc();
        const data = rpcContext.getData<AuthenticationRequest>();
 
        try {
            const client = new sdk.Client()
                  .setEndpoint(this.configService.getOrThrow<string>('APPWRITE_ENDPOINT'))
                  .setProject(this.configService.getOrThrow<string>('APPWRITE_PROJECT_ID'))
                  .setJWT(data.authToken);

            const session = new sdk.Account(client);
            await session.get();
            
            return true;
        } catch(error) {
            this.logger.info(`${this.guard.valueOf()}: Erro ao iniciar a sessão ${JSON.stringify(error)}`);
            throw new RpcException({
                code: status.INVALID_ARGUMENT,
                message: 'Token de autenticação ausente ou inválido.',
            });
        }
    }
}

@Injectable()
export class LogoutRpcGuard implements CanActivate {
    constructor(
        @Inject('LOGGER_TOKEN') private readonly logger: ConsoleLogger
    ) {}

    private readonly guard = CsmsGuards.AUTH;

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const rpcContext = context.switchToRpc();
        const data = rpcContext.getData<LogoutRequest>();
        this.logger.info(`[${this.guard.valueOf()}]: Verificando mensagem de logout - SessionID: ${data.sessionId}`);

        if (!data.sessionId) {
            this.logger.error(`[${this.guard.valueOf()}]: Mensagem de logout inválida - SessionID ausente.`);
            throw new RpcException({
                code: status.INVALID_ARGUMENT,
                message: 'O campo sessionId é obrigatório para encerrar a sessão.',
            });
        }

        return true;
    }
}