import { Address } from "../address-db";
import { IdToken } from "../ocpp/idToken-db";

export enum UserType {
    DRIVER = 'driver',
    ADMINISTRATOR = 'administrator'
}

export interface User {
    $id: string,
    name: string,
    /** EnergyTransferPeriod criar um tipo photo no banco */
    photo: string,
    email: string,
    password: string,
    userType: UserType,
    address: Address,
    idTokens?: IdToken[]
}
