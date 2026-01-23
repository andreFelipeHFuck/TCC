import { SchemaContext } from "../types";

export async function createEnergySchema(schema: SchemaContext) {
    const currentDirection = await schema.databases.createEnumAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'currentDirection',
        elements: ['toVehicle', 'toGrid'],
        required: true,
    });

    console.log(`[Script Create Database] criando atributo CURRENT_DIRECTION na collection ${schema.collectionId}`);

    const currentSoc = await schema.databases.createIntegerAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'currentSoc',
        required: true,
        min: 0,
        max: 100
    });

    console.log(`[Script Create Database] criando atributo CURRENT_SOC na collection ${schema.collectionId}`);

    const currentEnergyKWh = await schema.databases.createFloatAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'currentEnergyKWh',
        required: true,
    });

    console.log(`[Script Create Database] criando atributo CURRENT_ENERGY_KWH na collection ${schema.collectionId}`);
}
