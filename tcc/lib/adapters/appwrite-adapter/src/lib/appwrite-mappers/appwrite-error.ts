import {
    AppwriteError,

    NetworkError,
    UnauthorizedError,
    NotFoundError,
    UnknowError
} from '@tcc/types';

/**
 * Função que realiza o mapeamento dos erros do Appwrite para os erros do App
 * 
 * @param error erros gerados pelo SDk do Appwrite
 * 
 * @returns objeto AppError com os erros do App
 */
export function appwriteMapperError(error: unknown): AppwriteError {
    if (error instanceof AppwriteError) {
        switch (error.code) {
            case '400':
                return new Error();
        
            default:
                return new UnknowError();
        }
    }

    return new UnknowError();
}