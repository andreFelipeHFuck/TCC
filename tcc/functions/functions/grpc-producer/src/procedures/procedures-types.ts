import * as path from 'path';

import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';

export enum ProceduresTypes  {
    UNKNOW,
    BUNSINESS
}

const UNKNOW = '';
const BUSINESS = path.join(__dirname, '..', 'shared', 'business.proto');

const PROTO_PATHS = [
    UNKNOW,
    BUSINESS
];

export function dateToTimestamp(date: Date) {
    const ms = date.getTime();
    return {
        seconds: Math.floor(ms / 1000),
        nanos: (ms % 1000) * 1000000
    };
}


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
