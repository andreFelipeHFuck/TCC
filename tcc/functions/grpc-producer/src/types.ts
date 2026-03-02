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
