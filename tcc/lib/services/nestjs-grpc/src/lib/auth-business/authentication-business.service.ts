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
     * 3 - Criação de um método que permita validar e retornar o resultado de forma idepotente;
     * 4 - Método para armazenar o resultado;
     * 5 - Maneiras de renovar essa sessão em caso de expiração.
     *
     * 
     */

    async createSession(data: AuthenticationRequest): Promise<AuthenticationResponse> {
        //const sessionData = await this.redisStoreService.getSession(data.sessionId);

        await this.redisStoreService.saveSession(data.sessionId, data);

        const sessionData = await this.redisStoreService.getSession(data.sessionId);

        this.logger.debug(`${this.session.valueOf()} - ${JSON.stringify(sessionData)}`);

        return {
            success: true,
            sessionId: data.sessionId,
            processedAt: data.expiresAt
        }
    }
}
  