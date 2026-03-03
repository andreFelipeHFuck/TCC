import { ID } from "node-appwrite";

import { 
    User,
    UserType
} from "@tcc/types";

import { 
    databases,
    DATABASE_ID,
    USER_ID
} from "./types";

const user = {
    name: 'Admin',
    email: 'admin@email.coom',
    password: 'admin',
    photo: '',
    userType: UserType.ADMINISTRATOR,
    state: "Santa Catarina",
    city: "Joinville",
    neighborhood: "Centro",
    street: "Rua das Palmeiras",
    cep: "89201000",
    streetNumber: 150
}

async function createUserAdmin() {
    console.log('[Script Create Database] criando usuário');
    try {
        const promise = await databases.createDocument(DATABASE_ID, USER_ID, ID.unique(), user);
        console.info(`[Script Create Database] usuário criado com sucesso: ${promise}`);
    } catch (error) {
        console.info(`[Script Create Database] não foi possível criar o usuário: ${error.message}`);
    }
}

export async function main() {
    await createUserAdmin();
}

