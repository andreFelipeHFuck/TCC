import { Client, Databases, RelationshipType } from "node-appwrite";

export type Schema<TInput> = (input: TInput) => Promise<void>;

export type SchemaContext   = {
    databases: Databases,
    databaseId: string,
    collectionId: string
};

export type Collection = {
    name: string,
    id: string,
    schemas: Schema<SchemaContext>[]
};

export type Relationship = {
    collectionId: string, 
    relationCollectionId: string, 
    relationType: RelationshipType, 
    twoWay: boolean, 
    onDelete: string
}

export const client = new Client()
    .setEndpoint('http://localhost/v1')
    .setProject('69598d0e0005838fd88f')
    .setKey('standard_49034ff277c651e091373ad13545cca48fee48f9df9d9a2a120b5a648f488c3b15b3a38a5f3d4a174af2c04607e08c15976059ecffdcbb2bdddc486bcbed03dadca78be01fd9c8e1ab67c81584eee817b329212426d2a3db1e7d762016232536ac8b37624bf6b588ba5b9ae89b68117c46ccd3697ab09d150ca9b5eda05e1cc0');
    
export const databases = new Databases(client);

export const DATABASE_ID = "teste-db";
export const DATABASE_NAME = "Teste";
export const USER_ID = "users_id";
