import { Controller, Get, Header } from '@nestjs/common';

@Controller()
export class AppController {
 
  @Get()
  @Header('Content-Type', 'text/html')
  home(): string {
    return '<a href="/auth/google">Login con Google</a>';
  }
}
