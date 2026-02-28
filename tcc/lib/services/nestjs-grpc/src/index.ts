export * from './lib/AuthenticationBusiness/authentication-business.module';
export * from './lib/AuthenticationBusiness/authentication-business.guard';

import { join } from 'path';

export const AUTH_GRPC_CONFIG = {
  package: 'business',
  protoPath: join(__dirname, 'proto/business.proto'),
};