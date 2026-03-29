import { 
    Inject, 
    Injectable
} from "@nestjs/common";

import { Logger, LogoutRequest, LogoutResponse } from "@tcc/types";

import { AuthenticationRequest, AuthenticationResponse } from "@tcc/types";

import { CsmsServices } from '@tcc/types'
import { RedisStoreService } from "@tcc/redis";

@Injectable()
export class AuthenticationBusinessService {
    constructor(
        private readonly redisStoreService: RedisStoreService,
        @Inject('LOGGER_TOKEN') private readonly logger: Logger
        
    ) {}

    private readonly service = CsmsServices.AUTH;

    private async updateSession(currentData: AuthenticationRequest, data: AuthenticationRequest): Promise<boolean> {
        const isMatch: boolean = currentData.sessionId === data.sessionId;

        // Se por algum motivo as sessões não batem de acordo, há inconsistência no cache/identidade.
        if(!isMatch) {
            this.logger.error(`Tentativa de atualização mal formada - Ids não casam: Cache[${currentData.sessionId}] !== Data[${data.sessionId}]`);
            return false;
        }

        // Checando tentativa de injeção de outra conta em sessão alheia
        const userDifferences = currentData.userSummary?.userId !== data.userSummary?.userId;
        if(userDifferences){
            this.logger.error(`Tentativa de roubo ou sobrescrita em sessão por UserId diferente. Session: ${data.sessionId}`);
            return false;
        }

        const differences = currentData.authToken !== data.authToken
                            || currentData.expiresAt !== data.expiresAt;

        // Se houver diferenças válidas de ciclo de vida do token (renovação/idempotência com mudanca leve)
        if(differences){
            // Se falhar o update físico retorne falso.
            const update = await this.redisStoreService.updateSession(data.sessionId, data);
            return update;
        }

        // Se for idêntico e não houver diferenças, já considera sucesso para manter a idempotência.
        return true;
    }

    async createSession(data: AuthenticationRequest): Promise<AuthenticationResponse> {
        // Validação preventiva basilar
        if (!data || !data.sessionId) {
            this.logger.error(`[${this.service.valueOf()}] Dados inválidos para criação de sessão: ${JSON.stringify(data)}`);
            return {
                success: false,
                sessionId: data?.sessionId ?? '',
                processedAt: data?.expiresAt
            };
        }

        try {
            const currentData = await this.redisStoreService.getSession<AuthenticationRequest>(data.sessionId);
            const exists = !!currentData;

            if(!exists) {
                this.logger.info(`[${this.service.valueOf()}] Criando sessão: ${JSON.stringify(data)}`);
                const save = await this.redisStoreService.saveSession(data.sessionId, data);
                return {
                    success: save,
                    sessionId: data.sessionId,
                    processedAt: data.expiresAt
                };
            }

            const updata = await this.updateSession(currentData, data);

            if(!updata) {
                this.logger.error(`[${this.service.valueOf()}] Erro ao atualizar sessão: ${JSON.stringify(data)}`);
                return {
                    success: false,
                    sessionId: data.sessionId,
                    processedAt: data.expiresAt
                };
            }

            this.logger.info(`Sessão ${data.sessionId} atualizada com sucesso, dados: ${JSON.stringify(data)}`);
            return {
                success: true,
                sessionId: currentData.sessionId, // Retorna dados oficiais salvos
                processedAt: currentData.expiresAt
            };
        } catch (error) {
            // Caso 3: Erro de infra na comunicação (Redis offline, overflow, timeout, etc)
            this.logger.error('Erro na infraestrutura do Redis durante tentativa de resolver createSession', error as NodeJS.ErrnoException);
            return {
                success: false,
                sessionId: data.sessionId,
                processedAt: data.expiresAt
            };
        }
    }

    async deleteSession(data: LogoutRequest): Promise<LogoutResponse> {
        if (!data || !data.sessionId) {
            this.logger.error(`[${this.service.valueOf()}] Dados inválidos para encerramento de sessão: ${JSON.stringify(data)}`);
            return {
                success: false,
            };
        }   

        try {
            const currentData = await this.redisStoreService.getSession<AuthenticationRequest>(data.sessionId);
            const exists = !!currentData;

            if(!exists) {
                this.logger.info(`[${this.service.valueOf()}] Sessão não encontrada: ${JSON.stringify(data)}`);
                return {
                    success: false,
                };
            }

            await this.redisStoreService.invalidate(data.sessionId);
            this.logger.info(`[${this.service.valueOf()}] Logout da sessão realizado com sucesso`);
            return {
                success: true,
            };
        } catch (error) {
            this.logger.error('Erro na infraestrutura do Redis durante tentativa de resolver deleteSession', error as NodeJS.ErrnoException);
            return {
                success: false,
            };
        }
    }
}
  