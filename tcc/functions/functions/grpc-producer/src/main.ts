import {  
  AppwriteContext, 
  GRPC_SERVICE_ENDPOINT,
  FUNCTION
} from './types.js';
import { sendAuthentication } from './procedures/index.js';


export default async ({ req, res, log, error }: AppwriteContext) => {
     const grpcEndpoint = GRPC_SERVICE_ENDPOINT;

     log(`[${FUNCTION}] endpoint gRPC configurado: ${grpcEndpoint}`);

    if (!grpcEndpoint) {
        error(`[${FUNCTION}] Requisição inválida: GRPC_SERVICE_ENDPOINT não está configurado`);
        return res.json({ error: "Configuração ausente" }, 500);
    }

    try {
        const response = await sendAuthentication(grpcEndpoint, req.body);

        log(`[${FUNCTION}] Resposta recebida do gRPC: ${JSON.stringify(response)}`);

        return res.json({ 
            reply: response
        }, 200);
    } catch (e: any) {
        error(`[${FUNCTION}] Erro no gRPC: ${e.message}`);
        return res.json({ error: 'Falha na comunicação' }, 500);
    }
};
