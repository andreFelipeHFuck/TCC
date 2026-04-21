import { 
    Body,
    Controller, 
    Get, 
    HttpCode, 
    HttpStatus, 
    Inject, 
    Post,
    BadRequestException,
    ConflictException,
    InternalServerErrorException
} from '@nestjs/common';

import { 
    User, 
    RestResponse,
    CreateUserDTO
} from '@tcc/types';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(@Inject(UsersService) private readonly usersService: UsersService) {}

    @Get()
    findAll() {
        return { message: 'Hello World' };
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDTO): Promise<RestResponse<User>> {
        try {
            const user = await this.usersService.create(createUserDto);

            return {
                message: 'Usuário criado com sucesso',
                data: user,
            };
        } catch (error: any) {
            // Erro de registro duplicado no MongoDB
            if (error.code === 11000) {
                const duplicatedField = Object.keys(error.keyPattern)[0];
                const message = duplicatedField === 'email' 
                    ? 'Este e-mail já está cadastrado.' 
                    : `O campo ${duplicatedField} está duplicado.`;
                
                throw new ConflictException(`${message} Dados enviados: ${JSON.stringify(createUserDto)}`);
            }

            // Erro de validação do Mongoose ou outros erros de negócio
            if (error.name === 'ValidationError') {
                throw new BadRequestException('Erro de validação: ' + error.message);
            }

            // Erro genérico
            throw new InternalServerErrorException('Ocorreu um erro ao processar sua solicitação.');
        }
    }
}
