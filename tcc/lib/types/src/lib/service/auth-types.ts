import { User } from "../frontend"

export type UserAuth = User | 'NONE';
export type UserLoggedIn = { 
    $id: string, 
    email: string,
    user?: User,
    accessToken?: string
} | 'NONE';
export type UserSession = { session: boolean, dbUser: UserAuth, isConsistent: boolean } | null;

export interface AuthService {
    isLoggedIn(): Promise<UserLoggedIn>;
    getUser(): Promise<UserAuth>;
    createUser(user: User): Promise<void>;
    login(email: string, password: string): Promise<UserSession>;
    logout(): Promise<void>;
}
