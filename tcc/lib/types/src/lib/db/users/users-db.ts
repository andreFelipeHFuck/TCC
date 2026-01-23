import { Address } from "../address-db";

export enum UserType {
    DRIVER = 'driver',
    ADMINISTRATOR = 'administrator'
}

export interface User {
    $id: string,
    name: string,
    /** @todo criar um tipo photo no banco */
    photo: string,
    email: string,
    password: string,
    userType: UserType,
    address: Address
}
