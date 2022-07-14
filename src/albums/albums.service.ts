import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';

@Injectable()
export class AlbumsService {
  private albums: Array<Album> = [];

  create(createAlbumDto: CreateAlbumDto): Album {
    const newAlbum: Album = {
      id: uuidv4(),
      ...createAlbumDto,
    };

    this.albums.push(newAlbum);
    return newAlbum;
  }

  findAll(): Album[] {
    return this.albums;
  }

  findOne(id: string): Album {
    const album: Album = this.albums.find((a) => a.id === id);

    if (!album) {
      throw new NotFoundException('Album not found.');
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const index: number = this.albums.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new NotFoundException('Album not found.');
    }

    const newAlbum: Album = {
      id,
      ...updateAlbumDto,
    };

    this.albums[index] = newAlbum;

    return newAlbum;
  }

  remove(id: string) {
    const index: number = this.albums.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new NotFoundException('Album not found.');
    }

    this.albums.splice(index, 1);
  }
}
