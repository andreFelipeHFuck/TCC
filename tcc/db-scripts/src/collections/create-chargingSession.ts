import { SchemaContext } from "../types";

export async function createChargingSessionSchema(schema: SchemaContext) {
    const transactionId = await schema.databases.createStringAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'transactionId',
        size: 512,
        required: true,
    });

    console.log(`[Script Create Database] criando atributo TRANSACTION_ID na collection ${schema.collectionId}`);

    const chargingType = await schema.databases.createEnumAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'chargingType',
        elements: ['g2v', 'v2g'],
        required: true,
    });

    console.log(`[Script Create Database] criando atributo CHARGING_TYPE na collection ${schema.collectionId}`);

    const currentSoC = await schema.databases.createFloatAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'currentSoC',
        required: true,
        min: 0, 
        max: 100, 
    });

    console.log(`[Script Create Database] criando atributo CURRENT_SOC na collection ${schema.collectionId}`);
}
