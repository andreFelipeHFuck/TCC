import { InjectionToken } from '@angular/core';
import { IAuthDriver, IDatabaseDriver } from './auth-driver-types';
import { AuthService } from './auth-types';

export const AUTH_DRIVER = new InjectionToken<IAuthDriver>('AUTH_DRIVER');
export const DATABASE_DRIVER = new InjectionToken<IDatabaseDriver>('DATABASE_DRIVER');
export const AUTH_SERVICE = new InjectionToken<AuthService>('AUTH_SERVICE');

export * from './auth-types';
export * from './auth-driver-types';
