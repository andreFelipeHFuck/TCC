import {
    IsString,
    IsNumber,
    IsNotEmpty
} from 'class-validator';

export class CreateAddressDTO {
    @IsString()
    @IsNotEmpty()
    state!: string;

    @IsString()
    @IsNotEmpty()
    city!: string;

    @IsString()
    @IsNotEmpty()
    neighborhood!: string;

    @IsString()
    @IsNotEmpty()
    street!: string;

    @IsString()
    @IsNotEmpty()
    cep!: string;

    @IsNumber()
    @IsNotEmpty()
    streetNumber!: number;
}