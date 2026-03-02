import * as path from 'path';
import { fileURLToPath } from 'url';

import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export enum ProceduresTypes  {
    UNKNOWN = 0,
    BUSINESS = 1
}

const PROTO_PATHS: Record<number, string> = {
    [ProceduresTypes.UNKNOWN]: '',
    [ProceduresTypes.BUSINESS]: path.join(__dirname, '..', 'shared', 'business.proto')
};

export function packageDefinitions(procedure: ProceduresTypes) {
    const protoPath = PROTO_PATHS[procedure];
    
    if (!protoPath) {
        throw new Error(`Caminho proto não definido para o procedimento: ${procedure}`);
    }

    const definitions = protoLoader.loadSync(protoPath, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

    return grpc.loadPackageDefinition(definitions);
}

export function dateToTimestamp(date: Date) {
    const ms = date.getTime();
    return {
        seconds: Math.floor(ms / 1000),
        nanos: (ms % 1000) * 1000000
    };
}
