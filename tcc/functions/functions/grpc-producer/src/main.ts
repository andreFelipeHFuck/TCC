import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { fileURLToPath } from 'url';

import { sayHello } from './procedures/index.js';

// Define os tipos para o contexto do Appwrite
interface AppwriteContext {
    req: any;
    res: any;
    log: (message: any) => void;
    error: (message: any) => void;
}

export default async ({ req, res, log, error }: AppwriteContext) => {
    // const __dirname = path.dirname(fileURLToPath(import.meta.url));
    // const PROTO_PATH = path.join(__dirname, 'shared', 'business.proto');

    // const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    //     keepCase: true,
    //     longs: String,
    //     enums: String,
    //     defaults: true,
    //     oneofs: true,
    // });

    // // O "as any" aqui resolve o erro TS2339 (Property 'Greeter' does not exist)
    // const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
    
    // // Acesse o serviço conforme definido no seu .proto (ex: package 'business', service 'Greeter')
    // const client = new protoDescriptor.business.AuthenticationService(
    //     '172.17.0.1:50051',
    //     grpc.credentials.createInsecure()
    // );

    // const sayHello = (name: string): Promise<any> => {
    //     return new Promise((resolve, reject) => {
    //         client.SendAuthentication(
    //             {
    //                 auth_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    //                 expires_at: dateToTimestamp(new Date()),
    //                 user_summary: {
    //                     user_id: "user_123",
    //                     user_name: "André"
    //                 }
    //             }
    //             , (err: Error | null, response: any) => {
    //             if (err) reject(err);
    //             else resolve(response);
    //         });
    //     });
    // };

    try {
        const result = await sayHello(req.body.name || 'Mundo');
        return res.json({ reply: (result as any).message });
    } catch (e: any) {
        error('Erro no gRPC: ' + e.message);
        return res.json({ error: 'Falha na comunicação' }, 500);
    }
};