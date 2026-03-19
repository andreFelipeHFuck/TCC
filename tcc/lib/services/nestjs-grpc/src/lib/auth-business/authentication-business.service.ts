import { Injectable } from "@nestjs/common";

import { AuthenticationResponse } from "@tcc/types";
import { AuthenticationBusiness } from "@tcc/models";

import { RedisStoreService } from "@tcc/redis";

@Injectable()
export class AuthenticationBusinessService {
    constructor(
        private readonly redisStoreService: RedisStoreService,
        private readonly authenticationBusiness: AuthenticationBusiness
    ) {}

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
     * 1 - Escolha da chave a ser usada e refatoração a partir da chave;
     * 2 - Construção de um modelo consumidor produtor idepentente de linguagem para o sistema;
     * 3 - Criação de um método que permita validar e retornar o resultado de forma idepotente;
     * 4 - Método para armazenar o resultado;
     * 5 - Maneiras de renovar essa sessão em caso de expiração.
     *
     * 
     */

    private async isActiveSession(sessionId: string): Promise<boolean> {
        if (!sessionId) {
            return false;
        }
        
        const session = await this.redisStoreService.getSession(sessionId);
        return !!session;
    }

    async createSession(incomingSessionId?: string): Promise<AuthenticationResponse> {
        const active = incomingSessionId ? await this.isActiveSession(incomingSessionId) : false;
        
        const session = this.authenticationBusiness.generateSession(active, incomingSessionId);
    
        const sessionId = this.authenticationBusiness.getSessionId();
        const userData = this.authenticationBusiness.getAuthenticationResponse();

        await this.redisStoreService.saveSession(sessionId, userData);

        return session;
    }
}
  