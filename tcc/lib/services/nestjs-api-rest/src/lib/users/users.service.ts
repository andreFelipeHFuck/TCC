import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { 
    CreateUserDTO,
    User 
} from '@tcc/types';

import { Users } from '@tcc/nestjs-mongodb';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users.name) private userModel: Model<User>
    ) {}

    async create(createUserDto: CreateUserDTO): Promise<User> {
        const createUser = new this.userModel(createUserDto);

        return createUser.save();
    }
}