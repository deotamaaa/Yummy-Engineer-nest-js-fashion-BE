import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './models/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { User } from 'src/user/models/user.entity';
import { AuthGuard } from '@nestjs/passport';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly authService: AuthService
  ) { }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const existEmail = await this.userService.findOne({ email: body.email });
    if (existEmail) {
      throw new BadRequestException('Email already exist!');
    }
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
  ): Promise<{ user: User; token: string }> {
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new BadRequestException('User not found, check your email!');
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new BadRequestException('Invalid password');
    }

    const token = this.authService.getTokenForUser(user)

    return {
      user: user,
      token: token,
    };
  }

  // Get log in user data
  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  async user(@Req() request: Request) {
    return request.user;
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(
    @Res({ passthrough: true }) response: Response
  ) {
    response.clearCookie('auth_cookie')
    return {
      message: 'Logged out'
    }
  }

}
