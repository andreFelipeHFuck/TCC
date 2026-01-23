import { SchemaContext } from "../types";

export async  function createUsersVehiclesSchema(schema: SchemaContext) {
    const userId = await schema.databases.createStringAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'usersId',
        size: 512,
        required: true,
    });

    console.log(`[Script Create Database] criando atributo USER_ID na collection ${schema.collectionId}`);

    const vehicleId = await schema.databases.createStringAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'vehicleId',
        size: 512,
        required: true,
    });

    console.log(`[Script Create Database] criando atributo VEHICLE_ID na collection ${schema.collectionId}`);


    const minSoc = await schema.databases.createIntegerAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'streetNumber',
        required: true,
    });

    console.log(`[Script Create Database] criando atributo MIN_SOC na collection ${schema.collectionId}`);
}
