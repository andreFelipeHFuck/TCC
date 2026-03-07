import { Account, Client, Databases } from 'appwrite';

export type AppwriteClient = Client | 'NONE';
export type AppwriteAccount = Account | 'NONE';
export type AppwriteDatabases = Databases | 'NONE';

export enum AppwriteServices {
    UNKNOWN = 'APPWRITE UNKNOWN SERVICE',
    CONNECTION = 'APPWRITE CONNECTION SERVICE',
    AUTH = 'APPWRITE AUTH SERVICE',
    DATABASE = 'APPWRITE DATABASE SERVICE',
    STORAGE = 'APPWRITE STORAGE SERVICE',
    FUNCTIONS = 'APPWRITE FUNCTIONS SERVICE'
}

export enum AppwriteDatabaseCollection {
    UNKNOWN = '',
    USER = 'users_id'
}

/**
 * @todo refactors project to projectId
 */
export interface AppwriteConfig {
    endpoint: string,
    project: string,
    databaseId: string
};

export interface AppwriteUser {
    email: string;
    password: string;
}

