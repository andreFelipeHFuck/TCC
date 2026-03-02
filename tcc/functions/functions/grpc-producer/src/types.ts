export interface BodyRequest {
    user_id: string;
    user_name: string;
}

export interface AppwriteContext {
    req: any;
    res: any;
    log: (message: any) => void;
    error: (message: any) => void;
}
