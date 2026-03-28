import * as grpc from '@grpc/grpc-js';

import { 
    ProceduresTypes,
    packageDefinitions,
    PRODUCER
} from './procedures-types.js';
import { BodyRequest } from '../types.js';
import { SendAuthentication } from './send-authentication.js';

const protoDescriptor = packageDefinitions(ProceduresTypes.BUSINESS) as any;

function validateBody(req: any): BodyRequest | null {
    const { function_type, ...res} = req.body || {};
    const validate: boolean = typeof function_type === 'string'
                       && Object.keys(res).length > 0;

    if (!validate) {
        return null;
    }

    return {
        function_type,
        request: res
    }
}

function sendRequest(client: any, body: BodyRequest) {
    console.log(`[${PRODUCER}] Iniciando função gRPC Producer ...`);

    const { function_type, request } = body;

    switch (function_type) {
        case 'AUTH':
            return SendAuthentication(client, request);
        // case 'LOGOUT':
        //     return client.SendLogout(request);
        default:
            throw new Error(`[${PRODUCER}] Tipo de função inválido: ${function_type}`);
    }
}

export function sendAuthentication(
        grpcEndpoint: string, 
        body: BodyRequest
): Promise<any> {
    const client = new protoDescriptor.business.AuthenticationService(
        grpcEndpoint,
        grpc.credentials.createInsecure()
    );

    const validatedBody = validateBody({ body });

    if (!validatedBody) {
        return Promise.reject(
            new Error(`[${PRODUCER}] Requisição inválida, body invalido: ${JSON.stringify(body)}`)
        );
    }

    return sendRequest(client, validatedBody);
};