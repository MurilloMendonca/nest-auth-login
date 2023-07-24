import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Request() req) {
    return this.authService.logout(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  test(@Request() req) {
    return req.user;
  }
}
