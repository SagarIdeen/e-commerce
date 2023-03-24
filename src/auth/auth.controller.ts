import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-aut.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiTags('Authentication')
  @Post('/login')
  async login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }
}
