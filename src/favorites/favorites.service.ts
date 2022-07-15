import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { DbService } from 'src/db/db.service';

@Injectable()
export class FavoritesService {
  addTrack(id: string) {
    const track: any = DbService.tracks.find((a) => a.id === id);

    if (!track) {
      throw new UnprocessableEntityException('Track not found.');
    }
    DbService.favorites.tracks.push(track);
    return track;
  }

  addAlbum(id: string) {
    const album: any = DbService.albums.find((a) => a.id === id);

    if (!album) {
      throw new UnprocessableEntityException('Album not found.');
    }
    DbService.favorites.albums.push(album);
    return album;
  }

  addArtist(id: string) {
    const artist: any = DbService.artists.find((a) => a.id === id);

    if (!artist) {
      throw new UnprocessableEntityException('Artist not found.');
    }
    DbService.favorites.artists.push(artist);
    return artist;
  }

  findAll() {
    return DbService.favorites;
  }

  removeTrack(id: string): void {
    const index: number = DbService.favorites.tracks.findIndex(
      (track) => track.id === id,
    );
    console.log(index);

    if (index === -1) {
      throw new NotFoundException('Track not found.');
    }

    DbService.favorites.tracks.splice(index, 1);
  }

  removeAlbum(id: string): void {
    const index: number = DbService.favorites.albums.findIndex(
      (album) => album.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Album not found.');
    }

    DbService.favorites.albums.splice(index, 1);
  }

  removeArtist(id: string): void {
    const index: number = DbService.favorites.artists.findIndex(
      (artist) => artist.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Artist not found.');
    }

    DbService.favorites.artists.splice(index, 1);
  }
}
