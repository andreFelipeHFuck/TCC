import { BigQuery as GoogleBigQuery } from '@google-cloud/bigquery';

import { 
    Logger, 
    BigQueryClient,
    BigQueryError, 
    ConnectionServices 
} from '@tcc/types';

import { bigQueryMapperError } from '@tcc/big-query-adapter';

export class BigQuery extends ConnectionServices<BigQueryError> {
    private readonly logger: Logger;

    private client: BigQueryClient = 'NONE';

    constructor(logger: Logger){
        super();
        this.logger = logger;
    }

    async init(): Promise<void> {
        try {
            this.logger.info('Iniciando conexão com Google BigQuery ...');

            this.client = new GoogleBigQuery({
                projectId: process.env.BIG_PROJECT_ID;
                credentials: {
                    client_email: process.env.BQ_CLIENT_EMAIL,
                    private_key: process.env.BQ_PRIVATE_KEY?.replace(/\\n/g, '\n')
                }
            });

            this.client.getDatasets({ maxResults: 1 });

            this.status = 'ready';
        } catch (error) {
            this.status = 'error';
            this.lastError = bigQueryMapperError(error);

            this.logger.error('Erro ao inicializar', {
                error,
                mappedError: this.lastError
            });
        }
    }
}