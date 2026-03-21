import { 
    Inject, 
    Injectable
} from "@nestjs/common";

import { Logger } from "@tcc/types";

import { AuthenticationRequest, AuthenticationResponse } from "@tcc/types";

import { CsmsServices } from '@tcc/types'
import { RedisStoreService } from "@tcc/redis";

@Injectable()
export class AuthenticationBusinessService {
    constructor(
        private readonly redisStoreService: RedisStoreService,
        @Inject('LOGGER_TOKEN') private readonly logger: Logger
        
    ) {}

    private readonly session = CsmsServices.AUTH;

    /**
     * @todo Refatoração do serviço de autentificação do sistema
     * 
     * Premissa:
     * 
     * O sistema de autentificação deve ser idepotente perante as várias chamada a sua criação
     *  - Toda vez que estiver ativo e for feito uma chamada solicitando a criação deste deve retornar o 
     *  id session já existente
     * - Contudo para isso é preciso que haja uma chave para o redis que permita essa idepotencia
     *      - Opcções:
     *              - Usar id do usuário
     *              - Usar email do usuário
     *              - Usar id de sessão criado pelo cliente
     * 
     * Refatorações:
     * 
     *  X 1 - Escolha da chave a ser usada e refatoração a partir da chave;
     * 
     *  X3 - Criação de um método que permita validar e retornar o resultado de forma idepotente;
     * X4 - Método para armazenar o resultado;
     * 5 - Maneiras de renovar essa sessão em caso de expiração.
     *
     * 
     */

    /**
     * Casos de borda possíveis:
     * 
     * 1 - O sistema não suporta falhas na rede, quedas do servidor ou falta de memória RAM
     * 2 - Se o atributyo da chave for vazio ou inexistente durante a chamada da função
     * 
     */

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
                const save = await this.redisStoreService.saveSession(data.sessionId, data);
                return {
                    success: save,
                    sessionId: data.sessionId,
                    processedAt: data.expiresAt
                };
            }

            const updata = await this.updateSession(currentData, data);

            if(!updata) {
                return {
                    success: false,
                    sessionId: data.sessionId,
                    processedAt: data.expiresAt
                };
            }

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
}
  