import { v4 as uuidv4 } from 'uuid';
import { dateToTimestamp } from '../procedures/procedures-types.js';

import { BodyRequest } from '../types.js';

function  generateAuthenticationToken(): string {
    return uuidv4();
}

export function generateAuthenticationRequest(body: BodyRequest, date: Date){
    const request = {
        auth_token: generateAuthenticationToken(),
        expires_at: dateToTimestamp(date), // Token válido por 1 hora
        user_summary: body
    };

    return request;
}
