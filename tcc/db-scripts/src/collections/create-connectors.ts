import { SchemaContext } from "../types";

export async function createConnectorsSchema(schema: SchemaContext) {
    const  connectorId = await schema.databases.createStringAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'connectorId',
        size: 255,
        required: true,
    });

    console.log(`[Script Create Database] criando atributo CONNECTOR_ID na collection ${schema.collectionId}`);

    const active = await schema.databases.createBooleanAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'active',
        required: true,
    });

    console.log(`[Script Create Database] criando atributo ACTIVE na collection ${schema.collectionId}`);

    const conectorStatus  = await schema.databases.createBooleanAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'connectorStatus',
        required: true,
    });

    console.log(`[Script Create Database] criando atributo CONNECTOR_STATUS na collection ${schema.collectionId}`);

    const connectorType = await schema.databases.createEnumAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'connectorType',
        elements: [
            'SAE_J1772', 
            'IEC_62196', 
            'GB_T_20234', 
            'CHAdeMO', 
            'TESLA'
        ],
        required: true,
    });

    console.log(`[Script Create Database] criando atributo CONNECTOR_TYPE na collection ${schema.collectionId}`);

}

