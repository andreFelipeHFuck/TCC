import { Injectable } from '@angular/core';

import { Databases, Query } from 'appwrite';

import {
  AppwriteDatabaseCollection,
  AppwriteServices,
  CrudServiceDB,
  UserAuth,
  IDatabaseDriver
} from '@tcc/types';
import { Database } from './database';

@Injectable({
  providedIn: 'root',
})
export class DatabaseUser
  extends Database
  implements CrudServiceDB, IDatabaseDriver {

  constructor() {
    super();
    this.collection = AppwriteDatabaseCollection.USER;
  }

  public override async get<T>(id: string): Promise<T> {
    return await super.get<T>(this.collection, id);
  }

  public async getByEmail(email: string): Promise<UserAuth> {
    const result = await this.handleCall(
      this.getDatabases(),
      (databases: Databases) => databases.listDocuments(
        this.databaseId,
        this.collection.valueOf(),
        [
          Query.limit(1),
          Query.equal('email', email),
          Query.select([
            '$id',
            'name',
            'email',
            'photo',
            'userType',
            'state',
            'city',
            'neighborhood',
            'cep',
            'street'
          ])
        ]
      ),
      AppwriteServices.DATABASE,
      'Busca de credenciais pelo email realizada com sucesso',
      'Erro ao buscar credenciais no banco a partir do email'
    );

    if (!result.documents.length) {
      return 'NONE';
    }

    const user = result.documents[0];

    return { 
      userId: user['$id'], 
      name: user['name'],
      email: user['email'],
      photo: user['photo'],
      userType: user['userType'],
      address: {
        state: user['state'],
        city: user['city'],
        neighborhood: user['neighborhood'],
        street: user['street'],
        cep: user['cep'],
        streetNumber: user['streetNumber']
      }
     };
  }

  public override async create<T>(data: T): Promise<void> {
    await super.create(this.collection, data);
  }

  public async login(email: string, password: string): Promise<UserAuth> {
    const result = await this.handleCall(
      this.getDatabases(),
      (databases: Databases) => databases.listDocuments(
        this.databaseId,
        this.collection.valueOf(),
        [
          Query.limit(1),
          Query.equal('email', email),
          Query.equal('password', password),
          Query.select([
            '$id',
            'name',
            'email',
            'photo',
            'userType',
            'state',
            'city',
            'neighborhood',
            'cep',
            'street'
          ])
        ]
      ),
      AppwriteServices.DATABASE,
      'Busca de credenciais realizada com sucesso',
      'Erro ao buscar credenciais no banco'
    );

    if (!result.documents.length) {
      return 'NONE';
    }

    const user = result.documents[0];

    return { 
      userId: user['$id'], 
      name: user['name'],
      email: user['email'],
      photo: user['photo'],
      userType: user['userType'],
      address: {
        state: user['state'],
        city: user['city'],
        neighborhood: user['neighborhood'],
        street: user['street'],
        cep: user['cep'],
        streetNumber: user['streetNumber']
      }
     };
  }
}
