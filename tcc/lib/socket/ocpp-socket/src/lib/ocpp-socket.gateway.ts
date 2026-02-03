import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
    cors: { origin: '*' }
})
export class OcppGateway {
    @WebSocketServer()
    // Operador de Asserção Definitiva
    server!: Server;

    /**
     * @todo alterar o nome do evento para o nome 
     * apropriado segundo o protocolo
     */
    @SubscribeMessage('ocpp')
    handleEvent(@MessageBody() data: string): string {
        return data;
    }
}
