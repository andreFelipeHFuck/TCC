import { Injectable } from '@angular/core';

import { Databases, Query } from 'appwrite';

import {
  AppwriteDatabaseCollection,
  AppwriteServices,
  AppwriteUser,
  CrudServiceDB,
  UserCreateDTO
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

  public override async get<UserCreateDTO>(id: string): Promise<UserCreateDTO> {
    return await super.get<UserCreateDTO>(this.collection, id);
  }

  public override async create<UserCreateDTO>(data: UserCreateDTO): Promise<void> {
    await super.create(this.collection, data);
  }

  public async login(email: string, password: string): Promise<string | null> {
    const result = await this.handleCall(
      this.getDatabases(),
      (databases: Databases) => databases.listDocuments(
        this.databaseId,
        this.collection.valueOf(),
        [
          Query.equal('email', email),
          Query.equal('password', password),
          Query.select(['email', 'password'])
        ]
      ),
      AppwriteServices.DATABASE,
      'Busca de credenciais realizada com sucesso',
      'Erro ao buscar credenciais no banco'
    );

    if (!result.documents.length) {
      return null;
    }

    return result.documents[0]['email'];
  }
}
