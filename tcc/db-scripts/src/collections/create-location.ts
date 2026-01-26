import { SchemaContext } from "../types";

export async function  createLocationSchema(schema: SchemaContext) {
    const name = await schema.databases.createStringAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'name',
        size: 255,
        required: true,
    });

    console.log(`[Script Create Database] criando atributo NAME na collection ${schema.collectionId}`);

    const coordinates = await schema.databases.createPointAttribute({
        databaseId: schema.databaseId,
        collectionId: schema.collectionId,
        key: 'coordinates',
        required: true
    });

    console.log(`[Script Create Database] criando atributo COORDINATES na collection ${schema.collectionId}`);

}
