import { Client, Databases } from "node-appwrite";

async function main(databaseId: string, databaseName: string) {
    const client = new Client()
    .setEndpoint('http://localhost/v1')
    .setProject('69598d0e0005838fd88f')
    .setKey('standard_49034ff277c651e091373ad13545cca48fee48f9df9d9a2a120b5a648f488c3b15b3a38a5f3d4a174af2c04607e08c15976059ecffdcbb2bdddc486bcbed03dadca78be01fd9c8e1ab67c81584eee817b329212426d2a3db1e7d762016232536ac8b37624bf6b588ba5b9ae89b68117c46ccd3697ab09d150ca9b5eda05e1cc0');
    
    const databases = new Databases(client);
    const appDatabasePromise = databases.create(databaseId, databaseName);

    appDatabasePromise.then(function (response) {
        console.info(`[Script Create Database] database ${databaseName} criado com sucesso\nResponse: ${response}`);
    }, 
    function (error) {
        console.error(`[Script Create Database] não foi possível criar a database ${databaseName}\nError: ${error}`);
    });
}

main('tste-db', 'Teste');
