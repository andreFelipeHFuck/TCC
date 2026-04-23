import { 
    RestServices,
    ApiRestError,
    UnknownError,
    Unauthorized,
    NotFoundError,
} from "@tcc/types";

function isApiRestErrorLike(error: any): boolean {
    return (
        error 
        && typeof error === 'object' 
        && ('code' in error || 'message' in error)
    );
}

export function apiRestMapperError(
    service: RestServices,
    error: unknown
) {
    switch (service) {
        case RestServices.CONNECTION:
            return restMapperErrorCONNECTION(error);
        case RestServices.AUTH:
            return restMapperErrorAUTH(error);
        default:
            return new UnknownError('Erro não mapeado');
    }
}

function restMapperErrorCONNECTION(error: unknown): ApiRestError {
    if (isApiRestErrorLike(error)) {
        const apiRestError = error as ApiRestError;
        switch (String(apiRestError.code)) {
            case '404':
                return new NotFoundError('Recurso não encontado');
            default:
                return new UnknownError(String(apiRestError.message));
        }
    }

    return new UnknownError();
}

function restMapperErrorAUTH(error: unknown): ApiRestError {
    if (isApiRestErrorLike(error)) {
        const apiRestError = error as ApiRestError;
        switch (String(apiRestError.code)) {
            case '401':
                return new Unauthorized('Usuário não autorizado');
            default:
                return new UnknownError(String(apiRestError.message));
        }
    }

    return new UnknownError();
}
