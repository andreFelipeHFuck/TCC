import {
    User,
    CreateUserFrontendDTO,
    Address
} from "@tcc/types";

export function appwriteUserToUserCreateDTO(user: User): CreateUserFrontendDTO {
    const { $id, address, ...rest } = user;

    return {
        ...rest,
        ...address
    } as CreateUserFrontendDTO;
}

export function CreateUserDTOToUser(user: CreateUserFrontendDTO): User {
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