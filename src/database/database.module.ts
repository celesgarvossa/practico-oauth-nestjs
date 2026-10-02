import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// @Global: cualquier módulo puede usar PrismaService sin importar este módulo
@Global()
@Module({
  providers: [PrismaService], // lo crea NestJS
  exports: [PrismaService], // lo comparte con los demás módulos
})
export class DatabaseModule {}