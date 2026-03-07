import { BigQuery } from '@google-cloud/bigquery';

export type BigQueryClient = BigQuery | 'NONE';

export interface BigQueryConfig { 
    projectId: string,
    keyFilename?: string
}
