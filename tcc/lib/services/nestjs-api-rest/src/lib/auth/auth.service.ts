import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { comparePassword } from './auth-utils';

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

    private loginResponse(user: any) {
        const userDoc = user._doc;

        return {
            userId: userDoc.userId,
            name: userDoc.name,
            email: userDoc.email,
            photo: userDoc.photo,
            userType: userDoc.userType,
            address: userDoc.address
        }
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.userId };
        return {
            message: "Login realizado com sucesso",
            data: {
                access_token: this.jwtService.sign(payload),
                user: this.loginResponse(user)
            }
        };
    }
}
