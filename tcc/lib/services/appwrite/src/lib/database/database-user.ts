import { inject, Injectable } from '@angular/core';

import { ID } from 'appwrite';

import {
  User,
  CrudServiceDB
} from '@tcc/types';
import { Database } from './database';

@Injectable({
  providedIn: 'root',
})
export class DatabaseUser extends CrudServiceDB {
  private readonly database: Database = inject(Database);

  constructor() {
    super();

  }

  public override async create<T>(data: T): Promise<void> {
    const database = this.database.getDatabase();
    const databaseId = this.database.getDatabaseId();

    await database.createDocument(
      databaseId,
      'users',
      ID.unique(),
      data as any // O appwrite pede Record<string, any>
    );
  }
}
