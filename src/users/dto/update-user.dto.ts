import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  login: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsNumber()
  @IsOptional()
  version: number; // integer number, increments on update

  @IsNumber()
  @IsNotEmpty()
  createdAt: number; // timestamp of creation

  @IsNumber()
  @IsOptional()
  updatedAt: number; // timestamp of last update

  @IsString()
  oldPassword: string; // previous password

  @IsString()
  newPassword: string; // new password
}
