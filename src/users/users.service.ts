import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private users: Array<User> = [];

  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      // save the new user in the db
      const user = await this.prisma.user.create({
        data: {
          id: uuidv4(),
          login: createUserDto.login,
          password: createUserDto.password,
          version: 1,
          createdAt: +new Date(),
          updatedAt: +new Date(),
        },
      });

      delete user.password;
      // returned the saved user
      return user;
    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) throw new NotFoundException('User not found.');

    if (user.password !== updateUserDto.oldPassword)
      throw new HttpException('Wrong old password', HttpStatus.FORBIDDEN);

    const updUser: User = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: updateUserDto.newPassword,
        version: { increment: 1 },
        updatedAt: Date.now(),
      },
    });

    delete updUser.password;

    return updUser;
  }

  async remove(id: string): Promise<void> {
    const user: User = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    } else {
      await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
    }
  }
}
