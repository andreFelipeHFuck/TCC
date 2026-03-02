import * as grpc from '@grpc/grpc-js';

import { 
    ProceduresTypes,
    packageDefinitions,
} from './procedures-types.js';
import { generateAuthenticationRequest } from '../models/business-models.js';
import { BodyRequest } from '../types.js';

const protoDescriptor = packageDefinitions(ProceduresTypes.BUSINESS) as any;

function validateBody(req: any): BodyRequest | null {
    const {  user_id, user_name } = req.body || {};
    
    if (typeof user_id === 'string' && typeof user_name === 'string') {
        return { user_id, user_name };
    }
    return null;
}

export function sendAuthentication(
        grpcEndpoint: string, 
        body: any
): { result: Promise<any>, authToken: string } {

    const client = new protoDescriptor.business.AuthenticationService(
        grpcEndpoint,
        grpc.credentials.createInsecure()
    );

    const validatedBody = validateBody({ body });

    if (!validatedBody) {
        return { result: Promise.reject(
            new Error('Requisição inválida: user_id e user_name são obrigatórios')
        ), authToken: '' };
    }

    const date: Date = new Date(Date.now() + 3600 * 1000); // Token válido por 1 hora   
    const { request, authToken } = generateAuthenticationRequest(validatedBody as BodyRequest, date);

    return { result: new Promise((resolve, reject) => {
            client.SendAuthentication(
                request
                , (err: Error | null, response: any) => {
                if (err) reject(err);
                else resolve(response);
            });
        }), 
        authToken: authToken
    };
};