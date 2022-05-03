import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/models/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }
  
  public getTokenForUser(user: User): string {
    return this.jwtService.sign({
      userEmail: user.email,
      sub: user.id
    })
  }
}
