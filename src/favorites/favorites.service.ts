import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Album } from 'src/albums/interfaces/album.interface';
import { Artist } from 'src/artists/interfaces/artist.interface';

import { PrismaService } from 'src/prisma/prisma.service';
import { Track } from 'src/tracks/interfaces/track.interface';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async addTrack(id: string) {
    const track: Track = await this.prisma.track.findUnique({
      where: {
        id: id,
      },
    });

    if (!track) throw new UnprocessableEntityException('Track not found.');

    const favorites = await this.prisma.favorites.findFirst();

    if (!favorites) {
      await this.prisma.favorites.create({
        data: {
          id,
        },
      });
    }
    const { id: favId } = await this.prisma.favorites.findFirst();

    const newTrack = await this.prisma.track.update({
      where: { id },
      data: { favoritesId: favId },
    });
    return newTrack;
  }

  async addAlbum(id: string) {
    const album: Album = await this.prisma.album.findUnique({
      where: {
        id: id,
      },
    });

    if (!album) throw new UnprocessableEntityException('Album not found.');

    const favorites = await this.prisma.favorites.findFirst();

    if (!favorites) {
      await this.prisma.favorites.create({
        data: {
          id,
        },
      });
    }
    const { id: favId } = await this.prisma.favorites.findFirst();

    const newAlbum = await this.prisma.album.update({
      where: { id },
      data: { favoritesId: favId },
    });
    return newAlbum;
  }

  async addArtist(id: string) {
    const artist: Artist = await this.prisma.artist.findUnique({
      where: {
        id: id,
      },
    });

    if (!artist) throw new UnprocessableEntityException('Artist not found.');

    const favorites = await this.prisma.favorites.findFirst();

    if (!favorites) {
      await this.prisma.favorites.create({
        data: {
          id,
        },
      });
    }
    const { id: favId } = await this.prisma.favorites.findFirst();

    const newArtist = await this.prisma.artist.update({
      where: { id },
      data: { favoritesId: favId },
    });
    return newArtist;
  }

  async findAll() {
    const favorites = await this.prisma.favorites.findFirst({
      select: {
        albums: {
          select: { id: true, name: true, year: true, artistId: true },
        },
        artists: {
          select: { id: true, name: true, grammy: true },
        },
        tracks: {
          select: {
            id: true,
            name: true,
            duration: true,
            artistId: true,
            albumId: true,
          },
        },
      },
    });
    if (!favorites) {
      return {
        artists: [],
        albums: [],
        tracks: [],
      };
    }
    return favorites;
  }

  async removeTrack(id: string): Promise<void> {
    await this.prisma.track.update({
      where: { id },
      data: { favoritesId: { set: null } },
    });
  }

  async removeAlbum(id: string): Promise<void> {
    await this.prisma.album.update({
      where: { id },
      data: { favoritesId: { set: null } },
    });
  }

  async removeArtist(id: string): Promise<void> {
    await this.prisma.artist.update({
      where: { id },
      data: { favoritesId: { set: null } },
    });
  }
}
