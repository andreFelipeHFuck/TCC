import { Databases, RelationshipType } from "node-appwrite";

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

