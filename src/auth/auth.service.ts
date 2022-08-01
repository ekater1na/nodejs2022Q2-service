import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signup(authDto: AuthDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(
      authDto.password,
      +this.config.get('CRYPT_SALT'),
    );

    const user = await this.prisma.user.create({
      data: {
        id: uuidv4(),
        login: authDto.login,
        password: hashedPassword,
        version: 1,
        createdAt: +new Date(),
        updatedAt: +new Date(),
      },
    });

    return this.signToken(user.id, user.login);
  }

  async login(authDto: AuthDto): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: {
        login: authDto.login,
      },
    });

    // if user does not exist throw exception
    if (!user) throw new ForbiddenException('Credentials incorrect');

    // compare password
    const pwMatches = await bcrypt.compare(authDto.password, user.password);

    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    return this.signToken(user.id, user.login);
  }

  async refresh(createUserDto: any): Promise<any> {
    return 'refresh';
  }

  async signToken(
    userId: string,
    login: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      login,
    };
    const secret = this.config.get('JWT_SECRET_KEY');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
