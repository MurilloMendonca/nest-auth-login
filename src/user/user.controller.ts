import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() user: User): Promise<any> {
    return this.userService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  async update(@Body() user: User): Promise<any> {
	console.log(user);
	return this.userService.update(user);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  
}
