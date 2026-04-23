import { ApiRestError } from "./app-error";

export class Network extends ApiRestError {
    constructor(message?: string) {
        super(message || 'Não foi possível conectar ao servidor');
    }
}

export class Unauthorized extends ApiRestError {
    constructor(message?: string) {
        super(message || 'Usuário não autorizado');
    }   
}

export class AuthError extends ApiRestError {
    constructor(message?: string) {
        super(message || 'Erro ao realizar autenticação');
    }
}

export class NotFoundError extends ApiRestError {
    constructor(message?: string) {
        super(message || 'Erro inesperado');
    }
}

export class UnknownError extends ApiRestError {
    constructor(message?: string) {
        super(message || 'Erro inesperado');
    }
}
