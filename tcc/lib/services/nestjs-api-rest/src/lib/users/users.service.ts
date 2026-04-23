import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { 
    CreateUserDTO,
    User 
} from '@tcc/types';

import { hashedPassword } from '../auth/auth-utils';

import { Users } from '@tcc/nestjs-mongodb';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users.name) private userModel: Model<User>
    ) {}

    async getById(userId: string): Promise<User | null> {        
        const user = await this.userModel.find({
            userId: { $eq: userId }
        }).exec();

        return user.length === 1 ? user[0] : null;
    }

    async getByEmail(userEmail: string): Promise<User | null> {
        const user = await this.userModel.find({
            email: { $eq: userEmail}
        }).exec();

        return user.length === 1 ? user[0] : null;
    }

    async create(createUserDto: CreateUserDTO): Promise<User> {
        createUserDto.password = await hashedPassword(createUserDto.password!);

        console.log(createUserDto);
        
        const { name, email, password, photo, userType } = createUserDto;
        const { state, city, neighborhood, street, cep, streetNumber } = createUserDto;
        
        const userAddress = {
            state,
            city,
            neighborhood,
            street,
            cep,
            streetNumber
        };
        
        const userData = {
            name,
            email,
            password,
            photo,
            userType,
            address: userAddress
            };

        const createUser = new this.userModel(userData);

        return createUser.save();
    }
}
