import { 
    Controller, 
    Inject, 
    Post, 
    Request, 
    UseGuards
} from "@nestjs/common";

import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./auth.guard";
import { Public } from "./public.decorator";


@Controller('auth')
export class AuthController {
     constructor(
        @Inject(UsersService) private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) {}
     
    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: any) {
        return this.authService.login(req.user);
    }
}
