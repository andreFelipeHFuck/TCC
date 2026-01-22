import { SchemaContext } from "../types";

export async function createVehicleSchema(schema: SchemaContext) {
    const brand = await schema.databases.createStringAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'brand',
        size: 100,
        required: true,
    });

    console.log(`[Script Create Database] criando atributo BRAND na collection ${schema.collectionId}`);

    const model = await schema.databases.createStringAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'model',
        size: 100,
        required: true,
    });

    console.log(`[Script Create Database] criando atributo MODEL na collection ${schema.collectionId}`);

    const vehicleType = await schema.databases.createEnumAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'vehicleType',
        elements: ['electric', 'hybrid'],
        required: true,
    });

    console.log(`[Script Create Database] criando atributo VEHICLE_TYPE na collection ${schema.collectionId}`);

    const minSoc = await schema.databases.createIntegerAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'streetNumber',
        required: true,
    });

    console.log(`[Script Create Database] criando atributo MIN_SOC na collection ${schema.collectionId}`);

}
