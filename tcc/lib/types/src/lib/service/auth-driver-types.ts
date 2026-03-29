import { UserAuth } from './auth-types';
import { User, UserCreateDTO } from '../db';

export interface IAuthDriver {
  get(): Promise<{ $id: string, email: string } | null>;
  create(name: string, email: string, password: string): Promise<any>;
  login(email: string, password: string): Promise<any>;
  logout(): Promise<void>;
  generateToken(): Promise<string>;
}

export interface IDatabaseDriver {
  getByEmail(email: string): Promise<UserAuth>;
  create(user: UserCreateDTO): Promise<any>;
  login(email: string, password: string): Promise<UserAuth>;
}
