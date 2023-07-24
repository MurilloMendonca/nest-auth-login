import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/user/user.entity';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userRepository: any;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    userRepository = moduleFixture.get(getRepositoryToken(User));
    await app.init();
  });

  afterEach(async () => {
    // Limpeza do banco de dados
    await userRepository.query('DELETE FROM users;');
  });

  it('/user/register (POST)', () => {
    const newUser = {
      name: 'Test user',
      password: 'TestPassword',
      email: 'test@example.com',
    };
    return request(app.getHttpServer())
      .post('/user/register')
      .send(newUser)
      .expect(201);
  });

  it('/user/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/user/1')
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('email');
        expect(response.body.name).toBe('Test user');
        expect(response.body.email).toBe('test@example.com');
      });
  });

});
