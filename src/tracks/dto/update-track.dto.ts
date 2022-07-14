import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  ValidateIf,
  IsUUID,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { CreateTrackDto } from './create-track.dto';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsString()
  @IsOptional()
  name: string;

  @ValidateIf((_, value) => value !== null)
  @IsUUID('4')
  artistId: string | null; // refers to Artist

  @ValidateIf((_, value) => value !== null)
  @IsUUID('4')
  albumId: string | null; // refers to Album

  @IsNumber()
  @IsOptional()
  duration: number; // integer number
}
