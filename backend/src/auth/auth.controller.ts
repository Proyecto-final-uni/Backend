import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogingDTO } from './dto/login.dto';
import { AuthDto } from './dto/create-auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: AuthDto) {
    return this.authService.register(userDto);
  }

  @Post('login')
  async login(@Body() loginDto: LogingDTO) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
  
}
