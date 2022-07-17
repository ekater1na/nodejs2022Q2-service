import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private users: Array<User> = [];

  async create(createUserDto: CreateUserDto): Promise<User> {
    const maxVersion = 0;

    const newUser = new UserEntity({
      id: uuidv4(),
      ...createUserDto,
      version: maxVersion + 1,
      createdAt: +new Date(),
      updatedAt: +new Date(),
    });

    this.users.push(newUser);
    return newUser;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(id: string): Promise<User> {
    const user: User = this.users.find((a) => a.id === id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const index: number = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException('User not found.');
    }

    const maxVersion: number = Math.max(
      ...this.users.map((user) => user.version),
      0,
    );

    if (updateUserDto.oldPassword !== this.users[index].password)
      throw new HttpException('Wrong old password', HttpStatus.FORBIDDEN);

    this.users[index].password = updateUserDto.newPassword;
    this.users[index].version = maxVersion + 1;
    this.users[index].updatedAt = Date.now();

    return this.users[index];
  }

  async remove(id: string): Promise<void> {
    const index: number = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException('User not found.');
    }

    this.users.splice(index, 1);
  }
}
