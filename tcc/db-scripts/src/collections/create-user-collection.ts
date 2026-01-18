import { Databases } from "node-appwrite";

async function  createUsersSchema(databases: Databases) {
    
}

export function createUserCollection(
    database: Databases, 
    databaseId: string,
    databaseName: string
) {
    const collectionName: string = 'Users';
    const collectionId: string = 'users_id';

    const promise = database.createCollection({
        databaseId: databaseId,
        collectionId: collectionId,
        name: collectionName
    });

    promise.then(function (response) {
        console.info(`[Script Create Database] collection ${collectionName} criado com sucesso\nResponse: ${response}`);
    }, function (error) {
        console.error(`[Script Create Database] não foi possível criar a collection ${collectionName}\nError: ${error}`);
    });
}
