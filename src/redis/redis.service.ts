import { Injectable } from '@nestjs/common';
import  Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly client: Redis;

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    });
  }

  async set(key: string, value: any, expiration: number) {
    await this.client.set(key, JSON.stringify(value), 'EX', expiration);
  }

  async get(key: string): Promise<any> {
    const data = await this.client.get(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  async del(key: string) {
    await this.client.del(key);
  }
}
