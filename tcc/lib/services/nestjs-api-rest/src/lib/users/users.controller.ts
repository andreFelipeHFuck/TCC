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
    InternalServerErrorException,
    Param,
    NotFoundException,
    Logger
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

    @Get('/getUser/:userId')
    async getUser(@Param('userId') userId: string): Promise<RestResponse<User>> {
        Logger.log(userId);
        
        try {
            const user = await this.usersService.getById(userId);

            if (!user) {
                throw new NotFoundException(`Usuário com ID ${userId} não encontrado.`);
            }

            return {
                message: 'Usuário encontrado com sucesso',
                data: user,
            }
        } catch (error: any) {
            if (error.name === 'CastError') {
                throw new BadRequestException('ID de usuário inválido.');
            }

            throw new InternalServerErrorException('Ocorreu um erro ao processar sua solicitação.');
        }
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
