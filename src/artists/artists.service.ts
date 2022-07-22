import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist: Artist = await this.prisma.artist.create({
      data: { id: uuidv4(), ...createArtistDto },
    });

    return newArtist;
  }

  async findAll(): Promise<Artist[]> {
    const artists = this.prisma.artist.findMany();
    return artists;
  }

  async findOne(id: string): Promise<Artist> {
    const artist: Artist = await this.prisma.artist.findUnique({
      where: {
        id: id,
      },
    });

    if (!artist) throw new NotFoundException('Artist not found.');

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist: Artist = await this.prisma.artist.update({
      where: {
        id: id,
      },
      data: {
        ...updateArtistDto,
      },
    });

    if (!artist) throw new NotFoundException('Artist not found.');

    return artist;
  }

  async remove(id: string): Promise<void> {
    const artist: Artist = await this.prisma.artist.delete({
      where: {
        id: id,
      },
    });

    if (!artist) throw new NotFoundException('Artist not found.');

    // DbService.tracks.forEach((track) => {
    //   if (track.artistId === id) {
    //     track.artistId = null;
    //   }
    // });

    // DbService.albums.forEach((track) => {
    //   if (track.artistId === id) {
    //     track.artistId = null;
    //   }
    // });

    // const indexArt: number = DbService.favorites.artists.findIndex(
    //   (artist) => artist.id === id,
    // );

    // if (index === -1) return null;

    // DbService.favorites.artists.splice(indexArt, 1);
  }
}
