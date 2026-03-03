export const GRPC_SERVICE_ENDPOINT = '172.17.0.1:50051'

export interface BodyRequest {
    user_id: string;
    user_name: string;
}

export interface GrpcRequest { 
    auth_token: string,
    expires_at: { 
        seconds: number, 
        nanos: number 
    }, 
    user_summary: BodyRequest 
}

export interface AppwriteContext {
    req: any;
    res: any;
    log: (message: any) => void;
    error: (message: any) => void;
}
