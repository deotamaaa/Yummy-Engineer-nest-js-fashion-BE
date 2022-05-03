import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from './models/user.entity';
import * as bcrypt from 'bcryptjs';
import { UserService } from './user.service';
import { UserCreateDto } from './models/user-create.dto';
import { UserUpdateDto } from './models/user-update.dto';
import { AuthGuard } from '@nestjs/passport';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {

  constructor(
    private userService: UserService
  ) { }

  @Get()
  async all(): Promise<User[]> {
    return await this.userService.all()
  }

  @Post()
  async create(@Body() body: UserCreateDto): Promise<User> {
    const password = await bcrypt.hash('123456', 12);
    return this.userService.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password
    });
  }

  //Get single user
  @Get(':id')
  async get(@Param('id') id: number): Promise<User> {
    return await this.userService.findOne({ id });
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UserUpdateDto,
  ) {
    await this.userService.update(id, {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
    })
    return await this.userService.findOne({ id });
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.userService.delete(id)
  }

}
