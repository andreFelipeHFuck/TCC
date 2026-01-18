import { Account, Client } from "appwrite";

import { AppwriteConfig } from "@tcc/types";

/**
 * Função que cria uma instância para se conectar ao servidor Appwrite
 * 
 * @param config objeto que contém o endpoint e o nome do projeto que deseja estabelecer a conexão
 * 
 * @returns retorna uma instância do objeto Client
*/
export function appwriteCreateCliente(config: AppwriteConfig): Client{
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
 * Função que cria uma instância de Connection e Account para uso em outros seviços
 * 
 * @param config objeto que contém o endpoint e o nome do projeto que deseja estabelecer a conexão
 * 
 * @returns retorna uma instância dos objetos Client e Account
 */
export function appwriteCreateConnection(config: AppwriteConfig): [Client, Account] {
    const client = appwriteCreateCliente(config);
    const account = appwriteCreatAccount(client);

    return [client, account];
}