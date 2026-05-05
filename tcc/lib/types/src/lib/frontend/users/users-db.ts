import { Address } from "../address-db";
import { IdToken } from "../ocpp/idToken-db";

export type UserType = 'driver' | 'administrator';

export enum UserTypeEnum {
    DRIVER = 'driver',
    ADMINISTRATOR = 'administrator'
}

export interface User {
    userId?: string,
    name: string,
    photo: string,
    email: string,
    password?: string,
    userType: UserType,
    address: Address,
    idTokens?: IdToken[]
}

export interface CreateUserFrontendDTO extends Address {
    name: string,
    email: string,
    password?: string,
    photo: string,
    userType: UserType,
}
