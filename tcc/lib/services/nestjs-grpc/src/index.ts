export * from './lib/auth-business/authentication-business.module';
export * from './lib/auth-business/authentication-business.guard';

export const AUTH_GRPC_CONFIG = {
  package: 'business',
  protoPath: 'proto/business.proto',

};
