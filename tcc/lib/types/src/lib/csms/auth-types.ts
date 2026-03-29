export enum AuthType {
    AUTH = 'AUTH',
    LOGOUT = 'LOGOUT'
}

export type AuthCsmsFunctionBody = {
    auth_type: string;
    user_id: string;
    user_name: string;
    user_email?: string;
    user_type?: string;
    token: string;
    session_id: string;
    expires_at: string;
}

export type LogoutCsmsFunctionBody = {
    auth_type: string;
    session_id: string;
}
