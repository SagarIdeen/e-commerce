import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-aut.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Body() createAuthDto: CreateAuthDto){
        return this.authService.login(createAuthDto)
    }
}
