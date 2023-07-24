import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Adicione aqui a sua lógica de autenticação e/ou autorização
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // Você pode lançar uma exceção com base em "info" ou "err" aqui
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
