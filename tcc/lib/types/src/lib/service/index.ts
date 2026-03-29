import { InjectionToken } from '@angular/core';
import { IAuthDriver, IDatabaseDriver, IGrpcDriver } from './auth-driver-types';
import { AuthService } from './auth-types';

export const AUTH_DRIVER = new InjectionToken<IAuthDriver>('AUTH_DRIVER');
export const DATABASE_DRIVER = new InjectionToken<IDatabaseDriver>('DATABASE_DRIVER');
export const AUTH_SERVICE = new InjectionToken<AuthService>('AUTH_SERVICE');
export const AUTH_GRPC_DRIVER = new InjectionToken<IGrpcDriver>('AUTH_GRPC_DRIVER');

export * from './auth-types';
export * from './auth-driver-types';
