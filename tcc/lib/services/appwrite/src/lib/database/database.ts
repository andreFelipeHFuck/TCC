import { inject, Injectable } from '@angular/core';

import { Databases, ID } from 'appwrite';

import { AppwriteDatabaseCollection, AppwriteServices } from '@tcc/types';
import { Appwrite } from '../appwrite';
import { APPWRITE_DATABASE_ID } from '../appwrite-connections/appwrite-token';

@Injectable({
  providedIn: 'root',
})
export class Database extends Appwrite {
  protected readonly databaseId: string = inject(APPWRITE_DATABASE_ID);

  protected collection: AppwriteDatabaseCollection = AppwriteDatabaseCollection.UNKNOWN;

  constructor() {
    super();
    this.service = AppwriteServices.DATABASE;
  }

  public getDatabaseId(): string {
    return this.databaseId;
  }

  /**
   * Recupera um documento de uma coleção específica
   * 
   * @param collectionId ID da coleção
   * @param id ID do documento
   */
  public async get<T>(collectionId: AppwriteDatabaseCollection, id: string): Promise<T> {
    return await this.handleCall(
      this.getDatabases(),
      (databases: Databases) => databases.getDocument(
        this.databaseId,
        collectionId.valueOf(),
        id
      ),
      AppwriteServices.DATABASE,
      'Documento recuperado com sucesso',
      'Erro ao recuperar documento'
    ) as unknown as T;
  }

  /**
   * Cria um novo documento em uma coleção específica
   * 
   * @param collectionId ID da coleção
   * @param data Dados do documento
   * @param documentId ID do documento (OPCIONAL - default ID.unique())
   */
  public async create<T>(collectionId: AppwriteDatabaseCollection, data: T, documentId: string = ID.unique()): Promise<void> {
    await this.handleCall(
      this.getDatabases(),
      (databases: Databases) => databases.createDocument(
        this.databaseId,
        collectionId.valueOf(),
        documentId,
        data as any
      ),
      AppwriteServices.DATABASE,
      'Documento criado com sucesso',
      'Erro ao criar documento'
    );
  }
}
