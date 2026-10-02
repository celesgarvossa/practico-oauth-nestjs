import { Controller, Get, Header, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Login con Google: el guard redirige a la pantalla de Google
  // (equivale a passport.authenticate('google') del ejemplo de clase)
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    // No hace falta código: el guard se encarga de la redirección
  }

  // Callback de Google: vuelve acá después del login
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  @Header('Content-Type', 'text/html')
  googleAuthRedirect(@Req() req: Request): string {
    // req.user es el usuario que devolvió GoogleStrategy.validate()
    const user = req.user as User;

    // En clase se guardaba el usuario en la sesión; acá generamos un JWT
    const token = this.authService.generateJwt(user);

    return `
      <h1>Hola ${user.firstName} ${user.lastName}</h1>
      <p>Email: ${user.email}</p>
      <img src="${user.picture}">
      <p>Tu token JWT (usalo para GET /users/me):</p>
      <textarea rows="6" cols="80" readonly>${token}</textarea>
    `;
  }
}