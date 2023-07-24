import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err, user, info: Error) {
    // Você pode lançar uma exceção com base em "info" ou "err" aqui
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
