import { Controller, Get, Header, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
  
  }


  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  @Header('Content-Type', 'text/html')
  googleAuthRedirect(@Req() req: Request): string {
   
    const user = req.user as User;

   
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