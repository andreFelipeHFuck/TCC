import { Account, Client } from 'appwrite';

export type AppwriteClient = Client | 'NONE';
export type AppwriteAccount = Account | 'NONE';

export interface  AppwriteConfig  {
    endpoint: string,
    project: string
};
