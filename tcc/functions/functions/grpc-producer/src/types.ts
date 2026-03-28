export const GRPC_SERVICE_ENDPOINT = '172.17.0.1:50051'

export const FUNCTION = 'APPWRITE FUNCTION GRPC PRODUCER';

export enum GrpcFunctionType {
    AUTH = 'AUTH',
    LOGOUT = 'LOGOUT'
}

export interface BodyRequest {
    function_type: GrpcFunctionType;
    request: object;
}

export interface SendAuthenticationRequest {
    user_id: string;
    user_name: string;
    token: string;
    session_id: string;
    expires_at: string;
}

export interface UserSummary {
    user_id: string;
    user_name: string;
}

export interface GrpcRequest { 
    auth_token: string,
    expires_at: { 
        seconds: number, 
        nanos: number 
    }, 
    user_summary: UserSummary,
    session_id: string 
}

export interface AppwriteContext {
    req: any;
    res: any;
    log: (message: any) => void;
    error: (message: any) => void;
}
