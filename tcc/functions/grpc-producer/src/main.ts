import 'dotenv/config';

import {  AppwriteContext } from './types.js';
import { sendAuthentication } from './procedures/index.js';

export default async ({ req, res, log, error }: AppwriteContext) => {
     const grpcEndpoint = process.env.GRPC_SERVICE_ENDPOINT;

     log(`[APPWRITE FUNCTION GRPC PRODUCER] endpoint gRPC configurado: ${grpcEndpoint}`);

    if (!grpcEndpoint) {
        error('APPWRITE FUNCTION GRPC PRODUCER] Requisição inválida: GRPC_SERVICE_ENDPOINT não está configurado');
        return res.json({ error: "Configuração ausente" }, 500);
    }

    try {
        log('[APPWRITE FUNCTION GRPC PRODUCER] Iniciando função gRPC Producer');
        const  { result, authToken } = await sendAuthentication(grpcEndpoint, req.body);
        return res.json({ 
            authToken: authToken,
            reply: (result as any).message 
        }, 200);
    } catch (e: any) {
        error('[APPWRITE FUNCTION GRPC PRODUCER]  Erro no gRPC: ' + e.message);
        return res.json({ error: 'Falha na comunicação' }, 500);
    }
};