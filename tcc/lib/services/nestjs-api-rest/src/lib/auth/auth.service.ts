import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { comparePassword } from '@tcc/utils'

import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) {}

    async validateUser(email: string, password: string): Promise<any | null> {
        const user = await this.usersService.getByEmail(email);

        if(user && await comparePassword(password, user.password!)) {
            const { password: _password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
