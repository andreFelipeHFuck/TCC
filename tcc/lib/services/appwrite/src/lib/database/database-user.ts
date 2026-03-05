import { inject, Injectable } from '@angular/core';

import { ID } from 'appwrite';

import {
  User,
  CrudServiceDB,
  Logger,
  ConnectionServices,
  AppwriteError,
  AppwriteServices
} from '@tcc/types';
import { Database } from './database';
import { appwriteMapperError } from '@tcc/appwrite-adapter';

const COLLECTION_ID = 'users_id';

@Injectable({
  providedIn: 'root',
})
export class DatabaseUser
  extends ConnectionServices<AppwriteError>
  implements CrudServiceDB {
  private readonly database: Database = inject(Database);
  private readonly logger: Logger = inject(Logger);

  constructor() {
    super();
    this.logger.info('[APPWRITE DATABASE USER SERVICE] Inicializado, id do banco: ', this.database.getDatabaseId());
  }

  override init(): Promise<void> {
    return Promise.resolve();
  }

  public async get<T>(id: string): Promise<T> {
    const database = this.database.getDatabase();
    const databaseId = this.database.getDatabaseId();

    console.log('[APPWRITE DATABASE USER SERVICE] get, id do banco: ', databaseId);

    const response = await database.getDocument(
      databaseId,
      COLLECTION_ID,
      id
    );

    return response as unknown as T;
  }

  public async create<T>(data: T): Promise<void> {
    const database = this.database.getDatabase();
    const databaseId = this.database.getDatabaseId();

    try {
      await database.createDocument(
        databaseId,
        COLLECTION_ID,
        ID.unique(),
        data as any // O appwrite pede Record<string, any>
      );
    } catch (error) {
      this.setError(appwriteMapperError(AppwriteServices.DATABASE, error));
      this.logger.error('[APPWRITE DATABASE USER SERVICE] Erro ao criar usuário', this.getError());
      throw this.getError();
    }

  }
}
