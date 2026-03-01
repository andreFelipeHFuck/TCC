import {
    jsonMensage,
    BigQueryError,
    AcessDeniedError,
    UnauthorizedError
} from '@tcc/types';

function transformMensageError(error: any, ErrorClass: new (json: jsonMensage) => BigQueryError): BigQueryError {
    const reason: string = error.errors?.[0]?.reason;
    const code: string = error.code?.toString() || '500';
    const errors = error.errros || [];

    const jsonMessage: jsonMensage = {
        type: reason,
        code,
        errors
    };

    return new ErrorClass(jsonMessage);
}

function code403CodeMapper(error: any, reason: string): BigQueryError {
    switch (reason) {
        case 'accessDenied':
        return transformMensageError(error, AcessDeniedError);

        default:
            return transformMensageError(error, UnauthorizedError);
            
    }
}


function httpCodeMapper(error: any): BigQueryError {
    const reason = error.errors?.[0]?.reason;

    switch (error.code) {
        // case 400:
        //     return 

        case 403:
            return code403CodeMapper(error, reason);

        // case 404:

        //     break;

        // case 500:

        //     break;
    
        default:
            return transformMensageError(error, UnauthorizedError);

    }
}

/**
 * Função que realiza o mapeamento dos erros do BigQuery para os erros da Api
 * 
 * @param error erros gerados pela biblioteca do BigQuery
 * 
 * @returns objeto BigQueryError com os erros da Api
 */
export function bigQueryMapperError(error: unknown): BigQueryError {
    if(error instanceof BigQueryError){
        return httpCodeMapper(error);
    }

    return transformMensageError(error, UnauthorizedError);
}
