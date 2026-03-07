/**
 * @todo refatorar as mensagens de erro do sistema 
 */
import { AppwriteError } from "./app-error";

export class NetworkError extends AppwriteError {
    constructor(message?: string) {
        super(message || 'Não foi possível conectar ao servidor');
    }
}

export class UnauthorizedError extends AppwriteError {
    constructor(message?: string) {
        super(message || 'Usuário não autorizado');
    }
}

export class AuthError extends AppwriteError {
    constructor(message?: string) {
        super(message || 'Erro ao realizar autenticação');
    }
}

export class NotFoundError extends AppwriteError {
    constructor(resource?: string) {
        super(resource ? `${resource} não encontrado` : 'Recurso não encontrado');
    }
}

export class UnknowError extends AppwriteError {
    constructor(message?: string) {
        super(message || 'Erro inesperado');
    }
}
