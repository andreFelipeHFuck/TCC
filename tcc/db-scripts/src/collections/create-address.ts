import { SchemaContext } from "../types";

export async function createAddress(schema: SchemaContext) {
    const state = await schema.databases.createStringAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'state',
        size: 255,
        required: true,
    });

    console.log(`Script Create Database] criando atributo STATE na collection ${schema.collectionId}`);

    const city = await schema.databases.createStringAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'city',
        size: 255,
        required: true,
    });

    console.log(`[Script Create Database] criando atributo CITY na collection ${schema.collectionId}`);

    const neighborhood = await schema.databases.createStringAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'neighborhood',
        size: 255,
        required: true,
    });

    console.log(`[Script Create Database] criando atributo NEIGHBORHOOD na collection ${schema.collectionId}`);


    const street = await schema.databases.createStringAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'street',
        size: 255,
        required: true,
    });

    console.log(`[Script Create Database] criando atributo STREET na collection ${schema.collectionId}`);


    const cep = await schema.databases.createStringAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'cep',
        size: 8,
        required: true,
    });

    console.log(`[Script Create Database] criando atributo CEP na collection ${schema.collectionId}`);

    const streetNumber = await schema.databases.createIntegerAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'streetNumber',
        required: true,
    });

    console.log(`[Script Create Database] criando atributo STREET_NUMBER na collection ${schema.collectionId}`);
    
}