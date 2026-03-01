import * as grpc from '@grpc/grpc-js';

import { 
    ProceduresTypes,
    dateToTimestamp,
    packageDefinitions,
} from './procedures-types.js';

const protoDescriptor = packageDefinitions(ProceduresTypes.BUNSINESS) as any;
const client = new protoDescriptor.business.AuthenticationService(
        '172.17.0.1:50051',
        grpc.credentials.createInsecure()
);

export const sayHello = (name: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            client.SendAuthentication(
                {
                    auth_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                    expires_at: dateToTimestamp(new Date()),
                    user_summary: {
                        user_id: "user_123",
                        user_name: "André"
                    }
                }
                , (err: Error | null, response: any) => {
                if (err) reject(err);
                else resolve(response);
            });
        });
    };