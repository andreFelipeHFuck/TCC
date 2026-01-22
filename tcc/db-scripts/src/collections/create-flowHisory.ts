import { SchemaContext } from "../types";

export async function createFlowHistorySchema(schema: SchemaContext) {
    const direction = await schema.databases.createEnumAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'direction',
        elements: ['toVehicle', 'toGrid'],
        required: true,
    });

    console.log(`[Script Create Database] criando atributo DIRECTION na collection ${schema.collectionId}`);

    const startSoc = await schema.databases.createIntegerAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'startSoc',
        required: true,
        min: 0,
        max: 100
    });

    console.log(`[Script Create Database] criando atributo START_SOC na collection ${schema.collectionId}`);

    const stopSoc = await schema.databases.createIntegerAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'stopSoc',
        required: true,
        min: 0,
        max: 100
    });

    console.log(`[Script Create Database] criando atributo STOP_SOC na collection ${schema.collectionId}`);

    const startCharging = await schema.databases.createDatetimeAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'startCharging',
        required: true,
    });

    console.log(`[Script Create Database] criando atributo START_CHARGING na collection ${schema.collectionId}`);

    const stopCharging = await schema.databases.createDatetimeAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'stoptCharging',
        required: true,
    });

    console.log(`[Script Create Database] criando atributo STOP_CHARGING na collection ${schema.collectionId}`);

}