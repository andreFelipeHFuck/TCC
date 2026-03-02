import * as grpc from '@grpc/grpc-js';

import { 
    ProceduresTypes,
    packageDefinitions,
} from './procedures-types.js';
import { generateAuthenticationRequest } from '../models/business-models.js';
import { BodyRequest } from '../types.js';

const protoDescriptor = packageDefinitions(ProceduresTypes.BUSINESS) as any;
const client = new protoDescriptor.business.AuthenticationService(
        '172.17.0.1:50051',
        grpc.credentials.createInsecure()
);

function validateBody(req: any): BodyRequest | null {
    const {  user_id, user_name } = req.body || {};
    
    if (typeof user_id === 'string' && typeof user_name === 'string') {
        return { user_id, user_name };
    }
    return null;
}

export function sendAuthentication(body: any): Promise<any> {
    const validatedBody = validateBody({ body });

    if (!validatedBody) {
        return Promise.reject(
            new Error('[APPWRITE FUNCTION GRPC PRODUCER] Requisição inválida: user_id e user_name são obrigatórios')
        );
    }

    const date: Date = new Date(Date.now() + 3600 * 1000); // Token válido por 1 hora   
    const request = generateAuthenticationRequest(validatedBody as BodyRequest, date);

    return new Promise((resolve, reject) => {
            client.SendAuthentication(
                request
                , (err: Error | null, response: any) => {
                if (err) reject(err);
                else resolve(response);
            });
        });
    };