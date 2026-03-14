import { Account, Client, Databases, Functions } from "appwrite";

import { AppwriteConfig } from "@tcc/types";

/**
 * Função que cria uma instância para se conectar ao servidor Appwrite
 * 
 * @param config objeto que contém o endpoint e o nome do projeto que deseja estabelecer a conexão
 * 
 * @returns retorna uma instância do objeto Client
*/
export function appwriteCreateCliente(config: AppwriteConfig): Client {
    const client = new Client();

    client
        .setEndpoint(config.endpoint)
        .setProject(config.project);

    return client;
}


/**
 * Função que cria uma Account (Conta) que permite autenticar e gerenciar uma conta de usuário
 * 
 * @param client objeto Client de Appwrite
 * 
 * @returns retorna uma instância do objeto Account
 */
function appwriteCreatAccount(client: Client): Account {
    const account = new Account(client);

    return account
}

/**
 * Função que cria uma instância de Databases para interagir com coleções e documentos
 * 
 * @param client objeto Client de Appwrite
 * 
 * @returns retorna uma instância do objeto Databases
 */
export function appwriteCreateDatabases(client: Client): Databases {
    const databases = new Databases(client);

    return databases;
}

/**
 * Função que cria uma instância de Functions para interagir com funções
 * 
 * @param client objeto Client de Appwrite
 * 
 * @returns retorna uma instância do objeto Functions
 */
export function appwriteCreateFunctions(client: Client): Functions {
    const functions = new Functions(client);

    return functions;
}


/**
 * Função que cria uma instância de Connection e Account para uso em outros seviços
 * 
 * @param config objeto que contém o endpoint e o nome do projeto que deseja estabelecer a conexão
 * 
 * @returns retorna uma instância dos objetos Client, Account, Databases e Functions
 */
export function appwriteCreateConnection(config: AppwriteConfig): [Client, Account, Databases, Functions] {
    const client = appwriteCreateCliente(config);
    const account = appwriteCreatAccount(client);
    const databases = appwriteCreateDatabases(client);
    const functions = appwriteCreateFunctions(client);

    return [client, account, databases, functions];
}