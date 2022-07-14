import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';
import { validate as isValidUUID } from 'uuid';

@Injectable()
export class ArtistsService {
  private artists: Array<Artist> = [];

  create(createArtistDto: CreateArtistDto): Artist {
    const newArtist: Artist = {
      id: uuidv4(),
      ...createArtistDto,
    };

    this.artists.push(newArtist);
    return newArtist;
  }

  findAll() {
    return this.artists;
  }

  findOne(id: string): Artist {
    const artist: Artist = this.artists.find((a) => a.id === id);

    if (!isValidUUID(id)) {
      throw new BadRequestException('ID is invalid.');
    }

    if (!artist) {
      throw new NotFoundException('Artist not found.');
    }

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    if (!isValidUUID(id)) {
      throw new BadRequestException('ID is invalid.');
    }

    const index: number = this.artists.findIndex((artist) => artist.id === id);

    if (index === -1) {
      throw new NotFoundException('Artist not found.');
    }

    const newArtist: Artist = {
      id,
      ...updateArtistDto,
    };

    this.artists[index] = newArtist;

    return newArtist;
  }

  remove(id: string): void {
    if (!isValidUUID(id)) {
      throw new BadRequestException('ID is invalid.');
    }
    const index: number = this.artists.findIndex((artist) => artist.id === id);

    if (index === -1) {
      throw new NotFoundException('Artist not found.');
    }

    this.artists.splice(index, 1);
  }
}
