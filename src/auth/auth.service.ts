import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private redisService: RedisService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
	const user = await this.userService.findByEmail(email);
	console.log('validateUser()');
	console.log(user);
	console.log(pass);
	if (user && bcrypt.compareSync(pass, user.password)) {
	  const token = this.jwtService.sign({ username: user.name, sub: user.id });
	  const payload = { username: user.name, sub: user.id, token: token };
  
	  // Armazenar o token no Redis, expira em 60 minutos
	  await this.redisService.set(token, '', 60 * 60);
  
	  return {
		access_token: token,
		success: true,
		message: 'Login bem sucedido',
	  };
	}
	return {
	  success: false,
	  message: 'Usuário ou senha inválidos',
	};
  }
  

  async logout(token: string) {
    // Remove o token do Redis
    await this.redisService.del(token);
  }

  async validateUserByUsername(username: string): Promise<any> {
    return await this.userService.findOneByUsername(username);
}

}
