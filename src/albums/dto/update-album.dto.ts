import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { CreateAlbumDto } from './create-album.dto';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  year: number;

  @IsOptional()
  artistId: string | null;
}
