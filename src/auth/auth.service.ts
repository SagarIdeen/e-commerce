import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateAuthDto } from './dto/create-aut.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    throw new HttpException('Invalid Credentials', HttpStatus.FORBIDDEN);
  }

  async login(createAuthDto: CreateAuthDto) {
    const result = await this.validateUser(
      createAuthDto.email,
      createAuthDto.password,
    );
    const payload = { email: result.email, sub: result.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
