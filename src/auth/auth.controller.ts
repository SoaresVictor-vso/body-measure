import { Controller, Req, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { STATUS_CODES } from 'http';

@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    //Liberar sempre
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req: any) {
        const accessToken = this.authService.login(req.user);
        return {
            data: {
                accessToken,
                email: req.user.email,
                name: req.user.name,
                role: req.user.role,
                username: req.user.username
            },
            error: false,
            statusCode: 201
        }
    }
}
