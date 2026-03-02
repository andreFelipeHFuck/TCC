import {  AppwriteContext } from './types.js';
import { sendAuthentication } from './procedures/index.js';

export default async ({ req, res, log, error }: AppwriteContext) => {
    try {
        log('[APPWRITE FUNCTION GRPC PRODUCER] Iniciando função gRPC Producer');
        const result = await sendAuthentication(req.body);
        return res.json({ reply: (result as any).message });
    } catch (e: any) {
        error('[APPWRITE FUNCTION GRPC PRODUCER]  Erro no gRPC: ' + e.message);
        return res.json({ error: 'Falha na comunicação' }, 500);
    }
};