import { Databases } from "node-appwrite";

export async function createAddress(databases: Databases, databaseId: string, collectionId: string) {
    const stateAttribute = await databases.createStringAttribute({
        databaseId: databaseId,
        collectionId: collectionId,
        key: '',
        size: 255,
        required: true,
    });

    const cityAttribute = await databases.createStringAttribute({
        databaseId: databaseId,
        collectionId: collectionId,
        key: '',
        size: 255,
        required: true,
    });

    const neighborhoodAttribute = await databases.createStringAttribute({
        databaseId: databaseId,
        collectionId: collectionId,
        key: '',
        size: 255,
        required: true,
    });

    const streetAttribute = await databases.createStringAttribute({
        databaseId: databaseId,
        collectionId: collectionId,
        key: '',
        size: 255,
        required: true,
    });

    const cepAttribute = await databases.createStringAttribute({
        databaseId: databaseId,
        collectionId: collectionId,
        key: '',
        size: 8,
        required: true,
    });

    const streetNumber = await databases.createIntegerAttribute({
        databaseId: databaseId,
        collectionId: collectionId,
        key: '',
        required: true,
    });
    
}