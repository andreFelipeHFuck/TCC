import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {

    @Get()
    findAll() {
        return { message: 'Hello World' };
    }

    @Post()
    create() {
        
    }
}
