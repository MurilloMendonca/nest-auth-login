import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RedisService } from '../redis/redis.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
	private redisService: RedisService,
  ) {}

  create(user: User): Promise<User> {
    // hash the password
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    user.password = hashedPassword;
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    // Chave para armazenar/recuperar valor do cache
    const cacheKey = `user_${id}`;

    // Tenta recuperar o valor do cache
    const cachedValue = await this.redisService.get(cacheKey);

    if (cachedValue) {
      // Se existir no cache, retorna o valor
      return cachedValue;
    } else {
      // Se não existir no cache, recupera do banco de dados
      const value = await this.usersRepository.findOne({ where: { id } });

      // Armazena o valor recuperado no cache para futuras consultas
      await this.redisService.set(cacheKey, value, 60 * 60); // 1 hora

      return value;
    }
  }

  findOneByUsername(name: string): Promise<User> {
    return this.usersRepository.findOne({ where: { name } });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email: email } });
  }

  async update(user: User): Promise<any> {
	console.log(user);
	const hashedPassword = bcrypt.hashSync(user.password, 10);
	user.password = hashedPassword;
	const cachedValue = await this.redisService.get(`user_${user.id}`);
	if (cachedValue) {
		await this.redisService.del(`user_${user.id}`);
	}
	return this.usersRepository.update(user.id, user);
  }
}
