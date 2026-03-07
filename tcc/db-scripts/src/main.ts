import { select } from '@inquirer/prompts';

import { main as createDatabase } from "./create-database";
import { main as createUser } from "./create-user";

import {
    DATABASE_ID,
    DATABASE_NAME
} from "./types";

type Actions = 'BANCO' | 'USUARIO' | 'SAIR';

async function main() {
    // const actions = await select<Actions>({
    //     message: 'Selecione uma operação:',
    //     choices: [
    //         { name: 'Criar o Banco', value: 'BANCO' },
    //         { name: 'Criar usuário', value: 'USUARIO' },
    //         { name: 'Sair', value: 'SAIR' }
    //     ],
    // });


    // switch (actions) {
    //     // case 'BANCO':
    //     //     await createDatabase(DATABASE_ID, DATABASE_NAME);
    //     //     break;
    //     case 'USUARIO':
    //         await createUser();
    //         break;
    //     case 'SAIR':
    //         console.log('Até logo!');
    //         process.exit();
    // }

    // Opcional: Chama o main novamente para o menu ser contínuo
    // main();
    await createUser();
}

main();