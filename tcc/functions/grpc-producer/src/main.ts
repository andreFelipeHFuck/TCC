import {  
  AppwriteContext, 
  GRPC_SERVICE_ENDPOINT 
} from './types.js';
import { sendAuthentication } from './procedures/index.js';

export default async ({ req, res, log, error }: AppwriteContext) => {
     const grpcEndpoint = GRPC_SERVICE_ENDPOINT;

     log(`[APPWRITE FUNCTION GRPC PRODUCER] endpoint gRPC configurado: ${grpcEndpoint}`);

    if (!grpcEndpoint) {
        error('APPWRITE FUNCTION GRPC PRODUCER] Requisição inválida: GRPC_SERVICE_ENDPOINT não está configurado');
        return res.json({ error: "Configuração ausente" }, 500);
    }

    try {
        const  responnse = sendAuthentication(grpcEndpoint, req.body);

        const result = await responnse.result;

        log('[APPWRITE FUNCTION GRPC PRODUCER] Resposta recebida do gRPC: ' + JSON.stringify(result));

        return res.json({ 
            reply: (result as any).message 
        }, 200);
    } catch (e: any) {
        error('[APPWRITE FUNCTION GRPC PRODUCER]  Erro no gRPC: ' + e.message);
        return res.json({ error: 'Falha na comunicação' }, 500);
    }
};
