import { Controller, Get, Header } from '@nestjs/common';

@Controller()
export class AppController {
  // Página de inicio simple (igual que en el ejemplo de clase)
  @Get()
  @Header('Content-Type', 'text/html')
  home(): string {
    return '<a href="/auth/google">Login con Google</a>';
  }
}
