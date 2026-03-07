import {
    User,
    UserCreateDTO,
    Address
} from "@tcc/types";

export function appwriteUserToUserCreateDTO(user: User): UserCreateDTO {
    const { $id, address, ...rest } = user;

    return {
        ...rest,
        ...address
    } as UserCreateDTO;
}

export function userCreateDTOToUser(user: UserCreateDTO): User {
    const {
        state,
        city,
        neighborhood,
        street,
        cep,
        streetNumber,
        ...rest
    } = user;
    const address = {
        state,
        city,
        neighborhood,
        street,
        cep,
        streetNumber
    } as Address;

    return {
        ...rest,
        address
    } as User;
}