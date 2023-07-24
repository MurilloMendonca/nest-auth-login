import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Adiciona o repositório de User ao módulo
    RedisModule, // Importa o módulo Redis para que possa ser usado como cache
  ],
  providers: [UserService], // Fornecedores deste módulo
  controllers: [UserController], // Controladores deste módulo
  exports: [UserService], // Exporta o UserService para que outros módulos possam usá-lo
})
export class UserModule {}
