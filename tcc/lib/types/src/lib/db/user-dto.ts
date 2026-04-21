import {
    IsString,
    IsEnum,
    IsNotEmpty,
    IsOptional
} from 'class-validator';

import { UserTypeEnum } from '../frontend';

import { CreateAddressDTO } from "./address-dto";

export class CreateUserDTO extends CreateAddressDTO {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsOptional()
    password?: string;

    @IsString()
    @IsOptional()
    photo?: string;

    @IsEnum(UserTypeEnum)
    userType!: UserTypeEnum;
}
