import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './models/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }
  
  @Post('register')
  async register(@Body() body: RegisterDto) {
    if (body.password !== body.passwordConfirm) {
      throw new BadRequestException('Passwords do not match');
    }
    const hashed = await bcrypt.hash(body.password, 12);
    return this.userService.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: hashed,
    })
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response
  ) {
    const user = await this.userService.findOne({ email });
    if (!user) {
      console.log('User not found');
      throw new BadRequestException('User not found');
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      console.log('Invalid password');
      throw new BadRequestException('Invalid password');
    }

    const jwt = await this.jwtService.signAsync({ id: user.id })

    response.cookie('jwt', jwt, { httpOnly: true })
    console.log('this is user JWT: ', jwt);
    return user;
  }

  @Get('user')
  async user(@Req() request: Request) {
    const cookie = request.cookies['jwt']

    const data = await this.jwtService.verifyAsync(cookie)

    return this.userService.findOne({ id: data['id'] });
  }

  @Post('logout')
  async logout(
    @Res({ passthrough: true }) response: Response
  ) {
    response.clearCookie('jwt')
    return {
      message: 'Logged out'
    }
  }

}
