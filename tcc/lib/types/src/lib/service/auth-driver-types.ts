import { 
  UserAuth, 
  UserLoggedIn, 
  UserSession
} from './auth-types';

export interface IAuthDriver {
  get(): Promise<UserLoggedIn | 'NONE' >;
  create(name: string, email: string, password: string): Promise<UserLoggedIn>;
  login(email: string, password: string): Promise<UserLoggedIn | 'NONE'>;
  generateToken(): Promise<string>;
  logout(): Promise<void>;
}

export interface IDatabaseDriver {
    getByEmail(email: string): Promise<UserAuth | 'NONE'>;
    create<T>(data: T): Promise<void>;
    login(email: string, password: string): Promise<UserAuth | 'NONE'>;
}

export interface IGrpcDriver {
    authSession(authBody: any): Promise<any>;
    logout(logoutBody: any): Promise<any>;
}
