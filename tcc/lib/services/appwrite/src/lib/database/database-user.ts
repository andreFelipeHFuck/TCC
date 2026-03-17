import { Injectable } from '@angular/core';

import { Databases, Query } from 'appwrite';

import {
  AppwriteDatabaseCollection,
  AppwriteServices,
  CrudServiceDB,
} from '@tcc/types';
import { Database } from './database';

@Injectable({
  providedIn: 'root',
})
export class DatabaseUser
  extends Database
  implements CrudServiceDB {

  constructor() {
    super();
    this.collection = AppwriteDatabaseCollection.USER;
  }

  public override async get<T>(id: string): Promise<T> {
    return await super.get<T>(this.collection, id);
  }

  public async getByEmail(email: string) {
    this.logger.debug(`${this.service} Buscando usuário pelo email: ${email}`);

    const result = await this.handleCall(
      this.getDatabases(),
      (databases: Databases) => databases.listDocuments(
        this.databaseId,
        this.collection.valueOf(),
        [
          Query.limit(1),
          Query.equal('email', email),
          Query.select(['id', 'email'])
        ]
      ),
      AppwriteServices.DATABASE,
      'Busca de credenciais pelo email realizada com sucesso',
      'Erro ao buscar credenciais no banco a partir do email'
    );

    if (!result.documents.length) {
      return null;
    }

    const user = result.documents[0];

    return { id: user['$id'], email: user['email'] };
  }

  public override async create<T>(data: T): Promise<void> {
    await super.create(this.collection, data);
  }

  public async login(email: string, password: string): Promise<{id: string, email: string} | null> {
    const result = await this.handleCall(
      this.getDatabases(),
      (databases: Databases) => databases.listDocuments(
        this.databaseId,
        this.collection.valueOf(),
        [
          Query.limit(1),
          Query.equal('email', email),
          Query.equal('password', password),
          Query.select(['id', 'email'])
        ]
      ),
      AppwriteServices.DATABASE,
      'Busca de credenciais realizada com sucesso',
      'Erro ao buscar credenciais no banco'
    );

    if (!result.documents.length) {
      return null;
    }

    const user = result.documents[0];

    return { id: user['$id'], email: user['email'] };
  }
}
