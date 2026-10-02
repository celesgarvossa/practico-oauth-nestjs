import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// Datos que guardamos dentro del token
export interface JwtPayload {
  sub: number; // id del usuario
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      // Lee el token del header "Authorization: Bearer <token>"
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // rechaza tokens vencidos
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  // Si la firma del token es válida, lo que retornamos queda en req.user
  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}