import { SchemaContext } from "../types";

export async function createIdTokenSchema(schema: SchemaContext) {
    const name = await schema.databases.createStringAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'name',
        size: 255,
        required: true,
    });

    console.log(`[Script Create Database] criando atributo NAME na collection ${schema.collectionId}`);

    const token = await schema.databases.createStringAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'token',
        size: 255,
        required: true,
    });

    console.log(`[Script Create Database] criando atributo TOKEN na collection ${schema.collectionId}`);

    const idTokenType = await schema.databases.createEnumAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'idTokenType',
        elements: ['ocpp1.6', 'ocpp2.1'],
        required: true,
    });

    console.log(`[Script Create Database] criando atributo ID_TOKEN_TYPE na collection ${schema.collectionId}`);

}
