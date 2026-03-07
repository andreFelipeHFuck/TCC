import { Injectable } from '@angular/core';

import {
  AppwriteDatabaseCollection,
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
}
