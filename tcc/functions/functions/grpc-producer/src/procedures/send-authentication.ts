import { 
    dateToTimestamp, 
    PRODUCER 
} from "./procedures-types.js";
import { SendAuthenticationRequest } from "../types.js";

function validateRequest(request: SendAuthenticationRequest): boolean {
    const { user_id, user_name, token, session_id, expires_at } = request;
    const validate: boolean = typeof user_id === 'string'
                              && typeof user_name === 'string'
                              && typeof token === 'string'
                              && typeof session_id === 'string'
                              && typeof expires_at === 'string';
    
    if (!validate) return false;
    return true;
}

function generateRequest(request: any) {
    const validate: boolean = validateRequest(request);

    if(!validate) 
        throw Error(`[${PRODUCER}] Requisição inválida, body invalido: ${JSON.stringify(request)}`);

    const req = {
        auth_token: request.token,
        expires_at: dateToTimestamp(new Date(request.expires_at)),
        user_summary: {
            user_id: request.user_id,
            user_name: request.user_name,
        },
        session_id: request.session_id
    }

    return req;
}

export function SendAuthentication(client: any, request: any) {
   console.log(`[${PRODUCER}] Iniciando função gRPC SendAuthentication ...`);

    try {
        const req = generateRequest(request);
        console.log(`[${PRODUCER}] Requisição gerada: ${JSON.stringify(request)}`);

        return new Promise((resolve, reject) => {
        client.SendAuthentication(
            req
            , (err: Error | null, response: any) => {
            if (err) reject(err);
            else resolve(response);
        });
    });
   } catch(e) {
        return Promise.reject(e);
   }
}
