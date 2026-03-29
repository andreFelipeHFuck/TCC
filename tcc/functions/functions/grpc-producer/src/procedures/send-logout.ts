import { LogoutRequest } from "../types.js";
import { PRODUCER } from "./procedures-types.js";

function validateRequest(request: LogoutRequest): boolean {
    const { session_id } = request;
    const validate: boolean = typeof session_id === 'string';

    if(!validate) return false;
    return true;
}

function generateRequest(request: any) {
    const validate: boolean = validateRequest(request);

    if(!validate)
        throw Error(`[${PRODUCER}] Requisição inválida, request invalido: ${JSON.stringify(request)}`);

    const req = {
        session_id: request.session_id
    }

    return req;
}

export function sendLogout(
    client: any,
    request: any
){
    console.log(`[${PRODUCER}] Iniciando função gRPC Logout ...`);
    
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
