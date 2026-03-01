import * as path from 'path';

import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';

export enum ProceduresTypes  {
    UNKNOW,
    BUNSINESS
}

const UNKNOW = '';
const BUSINESS = path.resolve(__dirname, '..', 'shared', 'business.proto');

const PROTO_PATHS = [
    UNKNOW,
    BUSINESS
];

export function packageDefinitions(procedure: ProceduresTypes) {
    const definitions = protoLoader.loadSync(PROTO_PATHS[procedure.valueOf()], {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

    return grpc.loadPackageDefinition(definitions);
}
