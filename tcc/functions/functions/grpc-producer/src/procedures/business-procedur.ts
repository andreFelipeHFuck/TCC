import * as grpc from '@grpc/grpc-js';

import { 
    ProceduresTypes,
    packageDefinitions,
    PRODUCER
} from './procedures-types.js';
import { BodyRequest } from '../types.js';
import { SendAuthentication } from './send-authentication.js';
import { SendLogout } from './send-logout.js';

const protoDescriptor = packageDefinitions(ProceduresTypes.BUSINESS) as any;

function validateBody(req: any): BodyRequest | null {
    const { auth_type, ...res} = req.body || {};
    const validate: boolean = typeof auth_type === 'string';

    if (!validate) {
        return null;
    }

    return {
        auth_type,
        request: res
    }
}

function sendRequest(client: any, body: BodyRequest) {
    console.log(`[${PRODUCER}] Iniciando função gRPC Producer ...`);

    const { auth_type, request } = body;

    switch (auth_type) {
        case 'AUTH':
            return SendAuthentication(client, request);
        case 'LOGOUT':
            return SendLogout(client, request);
        default:
            throw new Error(`[${PRODUCER}] Tipo de função inválido: ${auth_type}`);
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