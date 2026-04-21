import { Module } from "@nestjs/common";

import { NestjsMongodbModule } from '@tcc/nestjs-mongodb';

import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    imports: [NestjsMongodbModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UserModule {}