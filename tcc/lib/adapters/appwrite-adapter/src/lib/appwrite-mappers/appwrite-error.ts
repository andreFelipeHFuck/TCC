import {
    AppwriteError,
    UnauthorizedErrorAppwrite,
    AuthErrorAppwrite,
    UnknownErrorAppwrite,
    AppwriteServices
} from '@tcc/types';

/**
 * Verifica se um erro desconhecido possui a estrutura básica de um AppwriteError
 * (contém propriedades como code ou message)
 */
function isAppwriteErrorLike(error: any): boolean {
    return (
        error &&
        typeof error === 'object' &&
        ('code' in error || 'message' in error)
    );
}

/**
 * Função que realiza o mapeamento dos erros do Appwrite para os erros do App
 * 
 * @param error erros gerados pelo SDk do Appwrite
 * 
 * @returns objeto AppError com os erros do App
 */
export function appwriteMapperError(service: AppwriteServices, error: unknown): AppwriteError {
    switch (service) {
        case AppwriteServices.AUTH:
            return appwriteMapperErrorAUTH(error);
        case AppwriteServices.CONNECTION:
            return appwriteMapperErrorCONNECTION(error);
        case AppwriteServices.DATABASE:
            return appwriteMapperErrorDATABASE(error);
        // case AppwriteServices.STORAGE:
        //     return appwriteMapperErrorSTORAGE(error);
        case AppwriteServices.FUNCTIONS:
            return appwriteMapperErrorFUNCTIONS(error);
        default:
            return new UnknownErrorAppwrite();
    }
}

function appwriteMapperErrorCONNECTION(error: unknown): AppwriteError {
    if (isAppwriteErrorLike(error)) {
        const appwriteError = error as AppwriteError;
        switch (String(appwriteError.code)) {
            case '401':
                return new UnauthorizedErrorAppwrite('Usuário não autorizado');

            default:
                return new UnknownErrorAppwrite(String(appwriteError.message));
        }
    }

    return new UnknownErrorAppwrite();
}

function appwriteMapperErrorAUTH(error: unknown): AppwriteError {
    if (isAppwriteErrorLike(error)) {
        const appwriteError = error as AppwriteError;
        switch (String(appwriteError.code)) {
            case '409':
                return new AuthErrorAppwrite('Tentativa de criar uma conta com um email já cadastrado');

            case '429':
                return new UnauthorizedErrorAppwrite('Muitas tentativas de login em pouco tempo');

            default:
                return new UnknownErrorAppwrite(String(appwriteError));
        }
    }

    return new UnknownErrorAppwrite('Erro inesperado de autenticação');
}

function appwriteMapperErrorFUNCTIONS(error: unknown): AppwriteError {
    if (isAppwriteErrorLike(error)) {
        const appwriteError = error as AppwriteError;
        return new UnknownErrorAppwrite(appwriteError.message);

        // switch (String(appwriteError.code)) {
        //     case '401':
        //         return new UnauthorizedError('Usuário não autorizado');

        //     default:
        //         return new UnknowError(String(appwriteError.message));
        // }
    }

    return new UnknownErrorAppwrite();
}

function appwriteMapperErrorDATABASE(error: unknown): AppwriteError {
    if (isAppwriteErrorLike(error)) {
        const appwriteError = error as AppwriteError;
        switch (String(appwriteError.code)) {
            case '403':
                return new UnauthorizedErrorAppwrite('Usuário não autorizado a escrever no banco de dados');

            default:
                return new UnknownErrorAppwrite(String(appwriteError.message));
        }
    }

    return new UnknownErrorAppwrite();
}
