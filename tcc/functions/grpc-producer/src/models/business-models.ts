import { v4 as uuidv4 } from 'uuid';
import { dateToTimestamp } from '../procedures/procedures-types.js';

import { BodyRequest, GrpcRequest } from '../types.js';

function  generateAuthenticationToken(): string {
    return uuidv4();
}

export function generateAuthenticationRequest(
    body: BodyRequest, 
    date: Date
): { request: GrpcRequest, authToken: string } {
    const authToken = generateAuthenticationToken();
    const request = {
        auth_token: authToken,
        expires_at: dateToTimestamp(date), // Token válido por 1 hora
        user_summary: body
    };

    return { request, authToken };
}
