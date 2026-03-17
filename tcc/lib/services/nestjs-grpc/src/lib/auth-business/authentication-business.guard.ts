import * as dotenv from 'dotenv';
dotenv.config();

/**
 * @todo criar um serviço para o backend para o SDK do Appwrite que possa fazer validar o JWS
 * @todo criar um serviço agnostico para BaaS para poder validar tanto usando Appwrite quanto Firebase
 */

import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

import * as jwt from 'jsonwebtoken';
import * as sdk from 'node-appwrite';

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

    /*
     canActivate(context: ExecutionContext): boolean  {
        const rpcContext = context.switchToRpc();
        const data = rpcContext.getData<AuthenticationRequest & { decodedSessionId?: string }>();

        // 1. Validar Token
        if (!data.authToken || data.authToken.length < 1) {
            throw new RpcException({
                code: status.INVALID_ARGUMENT,
                message: 'Token de autenticação ausente ou inválido.',
            });
        }

        try {
            // Decodificar o token para extrair as informações (JWS válido)
            // Nota: Para uma verificação completa da assinatura, precisaríamos da chave pública do Appwrite
            const decoded = jwt.decode(data.authToken) as { userId: string } | null;

            if (!decoded) {
                throw new Error('Token malformado' +  JSON.stringify({ token: data.authToken }));
            }

            // O Appwrite JWT geralmente contém o sessionId e o userId
            this.logger.info(`${this.guard.valueOf()}: Token decodificado para usuário: ${decoded.userId}`);

            // 2. Realizar uma verificação dos dados do usuário
            if (!data.userSummary?.userId) {
                throw new RpcException({
                    code: status.FAILED_PRECONDITION,
                    message: 'UserSummary incompleto na requisição.',
                });
            }

            // Opcional: Validar se o userId no token bate com o do summary
            if (decoded.userId !== data.userSummary.userId) {
                 this.logger.warn(`${this.guard.valueOf()}: Divergência de ID de usuário no token.`);
                 // Dependendo do nível de segurança, você poderia lançar erro aqui
            }

            if (data.expiresAt && data.expiresAt < new Date()) {
                this.logger.warn(`${this.guard.valueOf()}: Token expirado para usuário: ${data.userSummary.userName}`);
                throw new RpcException({
                    code: status.UNAUTHENTICATED,
                    message: 'O token enviado já expirou.',
                });
            }

            // Guardar o sessionId decodificado no contexto para uso posterior se necessário
            // No gRPC NestJS, podemos anexar ao objeto de dados temporariamente ou usar o contexto
            data.decodedSessionId = decoded.sessionId;

            return true;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
            this.logger.error(`${this.guard.valueOf()}: Erro ao processar token: ${errorMessage}`);
            throw new RpcException({
                code: status.UNAUTHENTICATED,
                message: 'Token inválido ou expirado.',
            });
        }
    }
    */

    /*
       const decoded: any = jwt.decode(authHeader);
            const call = context.switchToRpc().getData();
            const userId = call.userSummary.userId;

            this.logger.info(`${this.guard.valueOf()}: Token decodificado para usuário: ${JSON.stringify(decoded)}`);

            if (userId) {
                throw new RpcException({
                    code: status.FAILED_PRECONDITION,
                    message: 'UserSummary incompleto na requisição.',
                });
            }

            if (userId !== decoded.userId) {
                 this.logger.warn(`${this.guard.valueOf()}: Divergência de ID de usuário no token.`);
            }

            if (data.expiresAt && data.expiresAt < new Date()) {
                this.logger.warn(`${this.guard.valueOf()}: Token expirado para usuário: ${data.userSummary.userName}`);
                throw new RpcException({
                    code: status.UNAUTHENTICATED,
                    message: 'O token enviado já expirou.',
                });
            }
            
            return true;
    */

    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const rpcContext = context.switchToRpc();
        const data = rpcContext.getData<AuthenticationRequest>();
 
        try {
            const client = new sdk.Client()
                  .setEndpoint("http://localhost/v1")
                  .setProject("69598d0e0005838fd88f")
                  .setJWT(data.authToken);

            const session = new sdk.Account(client);
            const sessionData = await session.get();

            this.logger.info(`${this.guard.valueOf()}: Sessão do usuário: ${JSON.stringify(sessionData)}`);
            
            return false;
        } catch(error) {
            this.logger.info(`${this.guard.valueOf()}: Erro ao iniciar a sessão ${JSON.stringify(error)}`);
            throw new RpcException({
                code: status.INVALID_ARGUMENT,
                message: 'Token de autenticação ausente ou inválido.',
            });
        }
    }
}