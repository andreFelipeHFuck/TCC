import { AppWriteError } from "./app-error.error";

export class NetworkError extends AppWriteError {
    constructor() {
        super('Não foi possível conectar ao servidor');
    }
}

export class UnauthorizedError extends AppWriteError {
    constructor() {
        super('Usuário não autorizado');
    }
}

export class NotFoundError extends AppWriteError {
    constructor(resource?: string) {
        super(resource ? `${resource} não encontrado` : 'Recurso não encontrado');
    }
}

export class UnknowError extends AppWriteError {
    constructor() {
        super('Erro inesperado');
    }
}