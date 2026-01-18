import { AppwriteError } from "./app-error.error";

export class NetworkError extends AppwriteError {
    constructor() {
        super('Não foi possível conectar ao servidor');
    }
}

export class UnauthorizedError extends AppwriteError {
    constructor() {
        super('Usuário não autorizado');
    }
}

export class NotFoundError extends AppwriteError {
    constructor(resource?: string) {
        super(resource ? `${resource} não encontrado` : 'Recurso não encontrado');
    }
}

export class UnknowError extends AppwriteError {
    constructor() {
        super('Erro inesperado');
    }
}