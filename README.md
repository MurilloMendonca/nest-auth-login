
## Description

This is a toy project to learn and develop skills in the [Nest](https://github.com/nestjs/nest) Framework.
In this project I implemented:
	- A simple CRUD for a user entity, using a Postgres database. Routes: /user/register, /user/update, /user/<id>, /user/ .
	- Redis as a cache layer. Routes: /user/<id> .
	- A simple authentication system using JWT. Routes: /auth/login, /auth/logout, /auth/test .

## Requirements

- [Nest](https://github.com/nestjs/nest)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)



## Running the app

```bash
docker-compose up
```

## License

Nest is [MIT licensed](LICENSE).
