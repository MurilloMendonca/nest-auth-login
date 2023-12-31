import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    }); // passport local options
  }

  async validate(email: string, password: string): Promise<any> {
	console.log('LocalStrategy.validate()');
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException("Usuário ou senha inválidos");
    }
    return user;
  }
}
