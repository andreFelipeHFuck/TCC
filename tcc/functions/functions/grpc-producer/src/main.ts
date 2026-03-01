import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

export default async ({ req, res, log, error }) => {
    // 1. Carregar o arquivo proto
    const PROTO_PATH = './src/shared/business.proto';
    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

    // 2. Instanciar o cliente gRPC
    const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
    // Supondo que seu proto tenha: package 'business'; service 'Greeter';
    const client = new protoDescriptor.business.Greeter(
        'endereco-do-seu-servico:50052'
    );

    // 3. Promisify para facilitar o uso com async/await
    const sayHello = (name) => {
        return new Promise((resolve, reject) => {
            client.sayHello({ 
                "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "expires_at": "2026-12-31T23:59:59Z",
                "user_summary": {
                    "user_id": "user_123",
                    "user_name": "André"
                 }
             }, (err, response) => {
                if (err) reject(err);
                else resolve(response);
            });
        });
    };

    try {
        const result = await sayHello(req.body.name || 'Mundo');
        return res.json({ reply: result.message });
    } catch (e) {
        error('Erro no gRPC: ' + e.message);
        return res.json({ error: 'Falha na comunicação gRPC' }, 500);
    }
};