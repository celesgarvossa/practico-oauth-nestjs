import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Servicio que expone la conexión a la base de datos al resto de la app
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // Se ejecuta automáticamente cuando arranca el módulo
  async onModuleInit() {
    await this.$connect();
  }
}