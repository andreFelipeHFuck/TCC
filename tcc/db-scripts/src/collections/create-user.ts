import { SchemaContext } from "../types";

export async function  createUsersSchema(schema:  SchemaContext) {
    const name = await schema.databases.createStringAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'name',
        size: 255,
        required: true,
    });

    console.log(`[Script Create Database] criando atributo NAME na collection ${schema.collectionId}`);

    const email =  await schema.databases.createEmailAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'email',
        required: true,
    });

    console.log(`[Script Create Database] criando atributo EMAIL na collection ${schema.collectionId}`);

    const password = await schema.databases.createStringAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'password',
        size: 255,
        required: true,
    });

    console.log(`[Script Create Database] criando atributo PASSWORD na collection ${schema.collectionId}`);

    const userType = await schema.databases.createEnumAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'userType',
        elements: ['driver', 'administrator'],
        required: true,
    });

    console.log(`[Script Create Database] criando atributo USER_TYPE na collection ${schema.collectionId}`);

}
