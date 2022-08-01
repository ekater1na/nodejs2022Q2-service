import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async signup(loginDto: LoginDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(
      loginDto.password,
      +this.config.get('CRYPT_SALT'),
    );

    const user = await this.prisma.user.create({
      data: {
        id: uuidv4(),
        login: loginDto.login,
        password: hashedPassword,
        version: 1,
        createdAt: +new Date(),
        updatedAt: +new Date(),
      },
    });

    delete user.password;

    return user;
  }

  async login(loginDto: LoginDto): Promise<any> {
    return 'login';
  }

  async refresh(createUserDto: any): Promise<any> {
    return 'refresh';
  }
}
