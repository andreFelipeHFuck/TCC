export enum AuthType {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT'
}

export type AuthCsmsFunctionBody = {
    user_id: string;
    user_name: string;
    user_email?: string;
    user_type?: string;
    token: string;
    session_id: string;
    expires_at: string;
}
