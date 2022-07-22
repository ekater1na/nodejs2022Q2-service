import { Injectable, NotFoundException } from '@nestjs/common';
import { FavoritesService } from 'src/favorites/favorites.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';

@Injectable()
export class AlbumsService {
  constructor(
    private prisma: PrismaService,
    private readonly favoritesService: FavoritesService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum: Album = await this.prisma.album.create({
      data: {
        id: uuidv4(),
        ...createAlbumDto,
      },
    });

    return newAlbum;
  }

  async findAll(): Promise<Album[]> {
    const albums = this.prisma.album.findMany();
    return albums;
  }

  async findOne(id: string): Promise<Album> {
    const album: Album = await this.prisma.album.findUnique({
      where: {
        id: id,
      },
    });

    if (!album) throw new NotFoundException('Album not found.');

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album: Album = await this.prisma.album.update({
      where: {
        id: id,
      },
      data: {
        ...updateAlbumDto,
      },
    });

    if (!album) throw new NotFoundException('Album not found.');

    return album;
  }

  async remove(id: string) {
    const album: Album = await this.prisma.album.delete({
      where: {
        id: id,
      },
    });

    if (!album) throw new NotFoundException('Album not found.');

    // DbService.tracks.forEach((track) => {
    //   if (track.albumId === id) {
    //     track.albumId = null;
    //   }
    // });

    // const indexFav: number = DbService.favorites.albums.findIndex(
    //   (artist) => artist.id === id,
    // );

    // if (index === -1) return null;

    // DbService.favorites.albums.splice(indexFav, 1);
  }
}
