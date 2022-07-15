import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { v4 as uuidv4 } from 'uuid';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';

@Injectable()
export class ArtistsService {
  create(createArtistDto: CreateArtistDto): Artist {
    const newArtist: Artist = {
      id: uuidv4(),
      ...createArtistDto,
    };

    DbService.artists.push(newArtist);
    return newArtist;
  }

  findAll(): Artist[] {
    return DbService.artists;
  }

  findOne(id: string): Artist {
    const artist: Artist = DbService.artists.find((a) => a.id === id);

    if (!artist) {
      throw new NotFoundException('Artist not found.');
    }

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const index: number = DbService.artists.findIndex(
      (artist) => artist.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Artist not found.');
    }

    const newArtist: Artist = {
      id,
      ...updateArtistDto,
    };

    DbService.artists[index] = newArtist;

    return newArtist;
  }

  remove(id: string): void {
    const index: number = DbService.artists.findIndex(
      (artist) => artist.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Artist not found.');
    }

    DbService.artists.splice(index, 1);

    DbService.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });

    DbService.albums.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });
  }
}
