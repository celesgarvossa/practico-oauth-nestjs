import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';


export interface GoogleUserData {
  googleId: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
}

@Injectable()
export class UsersService {
 
  constructor(private prisma: PrismaService) {}

 
  findByGoogleId(googleId: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { googleId } });
  }


  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

 
  async findById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

 
  create(data: GoogleUserData): Promise<User> {
    return this.prisma.user.create({ data });
  }


  update(id: number, data: GoogleUserData): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }
}