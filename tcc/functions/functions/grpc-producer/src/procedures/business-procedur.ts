import * as grpc from '@grpc/grpc-js';

import { 
    ProceduresTypes,
    dateToTimestamp,
    packageDefinitions,
} from './procedures-types.js';
import { 
    BodyRequest, 
    GrpcRequest 
} from '../types.js';

const protoDescriptor = packageDefinitions(ProceduresTypes.BUSINESS) as any;

function validateBody(req: any): BodyRequest | null {
    const {  user_id, user_name , token, session_id, expires_at } = req.body || {};
    const validate: boolean = typeof user_id === 'string' 
                              && typeof user_name === 'string' 
                              && typeof token === 'string' 
                              && typeof session_id === 'string' 
                              && typeof expires_at === 'string';
    
    if (validate) {
        return { user_id, user_name, token, session_id, expires_at };
    }
    return null;
}

function generateAutehnticationRequest(body: BodyRequest): GrpcRequest{
    const request = {
        auth_token: body.token,
        expires_at: dateToTimestamp(new Date(body.expires_at)),
        user_summary: {
            user_id: body.user_id,
            user_name: body.user_name,
        },
        session_id: body.session_id
    }

    return request;
}

function sendRequest(client: any, body: BodyRequest) {
    console.log('[APPWRITE FUNCTION GRPC PRODUCER] Iniciando função gRPC Producer ...');

    const request = generateAutehnticationRequest(body);
    console.log('[APPWRITE FUNCTION GRPC PRODUCER] Requisição gerada: ' + JSON.stringify(request));

    return new Promise((resolve, reject) => {
        client.SendAuthentication(
            request
            , (err: Error | null, response: any) => {
            if (err) reject(err);
            else resolve(response);
        });
    });
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
            new Error('user_id e user_name são obrigatórios')
        );
    }
    console.log('[APPWRITE FUNCTION GRPC PRODUCER] Corpo da requisição validado: ' + JSON.stringify(validatedBody));

   return sendRequest(client, validatedBody);
};