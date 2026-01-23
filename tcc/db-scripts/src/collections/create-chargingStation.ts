import { SchemaContext } from "../types";

export async function createChargingStationSchema(schema: SchemaContext) {
    const name = await schema.databases.createStringAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'name',
        size: 255,
        required: true,
    });

    console.log(`[Script Create Database] criando atributo NAME na collection ${schema.collectionId}`);

    const photo =  await schema.databases.createStringAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'photo',
        size: 512,
        required: true,
    });

    console.log(`[Script Create Database] criando atributo PHOTO na collection ${schema.collectionId}`);

    const endpoint = await schema.databases.createStringAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'endpoint',
        size: 512,
        required: true,
    });

    console.log(`[Script Create Database] criando atributo ENDPOINT na collection ${schema.collectionId}`);


     const protocolVersion = await schema.databases.createEnumAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'protocolVersion',
        elements: ['ocpp1.6', 'ocpp2.1'],
        required: true,
    });

    console.log(`[Script Create Database] criando atributo PROTOCOL_VERSION na collection ${schema.collectionId}`);

    const online = await schema.databases.createBooleanAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'online',
        required: true,
    });

    console.log(`[Script Create Database] criando atributo ONLINE na collection ${schema.collectionId}`);

    const active = await schema.databases.createBooleanAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'active',
        required: true,
    });

    console.log(`[Script Create Database] criando atributo ACTIVE na collection ${schema.collectionId}`);

    const isSimulator  =  await schema.databases.createBooleanAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'isSimulator',
        required: true,
    });

    console.log(`[Script Create Database] criando atributo IS_SIMULATOR na collection ${schema.collectionId}`);
}
