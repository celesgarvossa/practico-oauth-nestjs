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

  // Registro o login con Google
  async validateGoogleUser(data: GoogleUserData): Promise<User> {
    // 1. ¿Ya existe un usuario con este googleId? -> actualizo su perfil
    const userByGoogleId = await this.usersService.findByGoogleId(data.googleId);
    if (userByGoogleId) {
      return this.usersService.update(userByGoogleId.id, data);
    }

    // 2. ¿Existe con el mismo email (registro previo)? -> le vinculo el googleId
    const userByEmail = await this.usersService.findByEmail(data.email);
    if (userByEmail) {
      return this.usersService.update(userByEmail.id, data);
    }

    // 3. No existe -> lo creo (registro)
    return this.usersService.create(data);
  }

  // Firma el JWT propio de nuestra aplicación
  generateJwt(user: User): string {
    const payload: JwtPayload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}