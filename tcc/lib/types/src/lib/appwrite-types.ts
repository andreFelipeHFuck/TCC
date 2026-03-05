import { Account, Client } from 'appwrite';

export type AppwriteClient = Client | 'NONE';
export type AppwriteAccount = Account | 'NONE';

export enum AppwriteServices {
    UNKNOWN,
    CONNECTION,
    AUTH,
    DATABASE,
    STORAGE,
    FUNCTIONS
}

/**
 * @todo refactors project to projectId
 */
export interface AppwriteConfig {
    endpoint: string,
    project: string,
    databaseId: string
};
