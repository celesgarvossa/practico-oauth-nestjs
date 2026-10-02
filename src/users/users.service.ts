import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';

// Datos que llegan del perfil de Google
export interface GoogleUserData {
  googleId: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
}

@Injectable()
export class UsersService {
  // NestJS nos "inyecta" PrismaService automáticamente
  constructor(private prisma: PrismaService) {}

  // Busca un usuario por su id de Google
  findByGoogleId(googleId: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { googleId } });
  }

  // Busca un usuario por email
  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  // Busca por id; si no existe, responde 404
  async findById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  // Crea un usuario nuevo (registro)
  create(data: GoogleUserData): Promise<User> {
    return this.prisma.user.create({ data });
  }

  // Actualiza un usuario existente con los datos de Google
  // (sirve para refrescar el perfil y para vincular el googleId)
  update(id: number, data: GoogleUserData): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }
}