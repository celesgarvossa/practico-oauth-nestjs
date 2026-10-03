import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { GoogleUserData, UsersService } from '../users/users.service';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  
  async validateGoogleUser(data: GoogleUserData): Promise<User> {
    
    const userByGoogleId = await this.usersService.findByGoogleId(data.googleId);
    if (userByGoogleId) {
      return this.usersService.update(userByGoogleId.id, data);
    }

    
    const userByEmail = await this.usersService.findByEmail(data.email);
    if (userByEmail) {
      return this.usersService.update(userByEmail.id, data);
    }

    
    return this.usersService.create(data);
  }

  
  generateJwt(user: User): string {
    const payload: JwtPayload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}