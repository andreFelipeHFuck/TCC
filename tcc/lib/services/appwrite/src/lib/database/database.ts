import { inject, Injectable } from '@angular/core';

import { Databases } from 'appwrite';

import {
  AppwriteClient,
  AppwriteError,
  ConnectionServices,
  Logger
} from '@tcc/types';
import { Appwrite } from '../appwrite';
import { APPWRITE_DATABASE_ID } from '../appwrite-connections/appwrite-token';

@Injectable({
  providedIn: 'root',
})
export class Database extends ConnectionServices<AppwriteError> {
  private readonly appwrite: Appwrite = inject(Appwrite);
  private readonly logger = inject(Logger);
  private readonly databaseId: string = inject(APPWRITE_DATABASE_ID);

  private client: AppwriteClient = 'NONE';

  constructor() {
    super();
    this.init();
  }

  async init(): Promise<void> {
    const _ = await this.appwrite.init();
    const isReady = this.appwrite.isReady();

    if (isReady) {
      this.client = this.appwrite.getClient();
    }
  }

  public getDatabase() {
    if (this.client === 'NONE') {
      throw new Error(' [APPWRITE DATABASE SERVICE] Serviço do Appwrite não está inicializado.');
    }

    return new Databases(this.client);
  }

  public getDatabaseId(): string {
    return this.databaseId;
  }
}
