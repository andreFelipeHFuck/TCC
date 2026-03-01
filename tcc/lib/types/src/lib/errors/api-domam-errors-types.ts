import { BigQueryError, jsonMensage } from "./app-error";

// BIG_QUERY DOMAM ERROS 
export class AcessDeniedError extends BigQueryError {
    constructor(
        public readonly json?: jsonMensage
    ) {
        super('[BIG QUERY] Acesso ao recurso indisponível', json);
    }
}

export class UnkonwBigQueryError extends BigQueryError {
    constructor(
        public readonly json?: jsonMensage
    ) {
        super('[BIG QUERY] Erro desconhecido', json);
    }
}
