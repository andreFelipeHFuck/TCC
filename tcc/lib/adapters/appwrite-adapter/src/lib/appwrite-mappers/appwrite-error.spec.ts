import { describe, it, expect } from 'vitest';

import {
    AppWriteError,

    NetworkError,
    UnauthorizedError,
    NotFoundError,
    UnknowError
} from '@tcc/types';

import { appwriteMapperError } from './appwrite-error.mapper';

class TestError extends AppWriteError {
    constructor() {
        super('Erro desconhecido', 'UNKNOW', 'UNKNOW');
    }
}

describe('Função appwriteMapperError', () => {
    it('Deve retornar UnlnownError se o erro não fizer parte de AppWriteError', () => {
        const error = new Error('Erro padrão');

        const resultError = appwriteMapperError(error);
        const expectedError = new UnknowError();

        expect(resultError).toEqual(expectedError);
    });

    it('Deve retornar UnlnownError se o código do erro for desconhecido', () => {
        const error = new TestError();

        const resultError = appwriteMapperError(error);
        const expectedError = new UnknowError();

        expect(resultError).toEqual(expectedError);
    }); 
})