import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((_, value) => value !== null)
  @IsUUID('4')
  artistId: string | null; // refers to Artist

  @ValidateIf((_, value) => value !== null)
  @IsUUID('4')
  albumId: string | null; // refers to Album

  @IsNumber()
  @IsNotEmpty()
  duration: number; // integer number
}
