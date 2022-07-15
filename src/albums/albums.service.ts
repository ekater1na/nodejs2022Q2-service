import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { v4 as uuidv4 } from 'uuid';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';

@Injectable()
export class AlbumsService {
  constructor(private readonly favoritesService: FavoritesService) {}

  create(createAlbumDto: CreateAlbumDto): Album {
    const newAlbum: Album = {
      id: uuidv4(),
      ...createAlbumDto,
    };

    DbService.albums.push(newAlbum);
    return newAlbum;
  }

  findAll(): Album[] {
    return DbService.albums;
  }

  findOne(id: string): Album {
    const album: Album = DbService.albums.find((a) => a.id === id);

    if (!album) {
      throw new NotFoundException('Album not found.');
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const index: number = DbService.albums.findIndex(
      (album) => album.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Album not found.');
    }

    const newAlbum: Album = {
      id,
      ...updateAlbumDto,
    };

    DbService.albums[index] = newAlbum;

    return newAlbum;
  }

  remove(id: string) {
    const index: number = DbService.albums.findIndex(
      (album) => album.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Album not found.');
    }

    DbService.albums.splice(index, 1);

    DbService.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
  }
}
