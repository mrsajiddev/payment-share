import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginData } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Get('token')
  getToken(@Body() user: { id: number; email: string }) {    
    return this.authService.getToken(user);
  }

  @Post('login')
  login(@Body() userCred: { email: string; password: string } ) {
    console.log("controller: " , userCred,)
    return this.authService.login(userCred)
  }
}
