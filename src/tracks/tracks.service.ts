import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    // To DO - Add type
    const newTrack: any = this.prisma.track.create({
      data: {
        id: uuidv4(),
        ...createTrackDto,
      },
    });

    return newTrack;
  }

  async findAll(): Promise<Track[]> {
    const tracks = this.prisma.track.findMany();
    return tracks;
  }

  async findOne(id: string): Promise<Track> {
    const track: Track = await this.prisma.track.findUnique({
      where: {
        id: id,
      },
    });

    if (!track) throw new NotFoundException('Track not found.');

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    await this.findOne(id);

    const updTrack: Track = await this.prisma.track.update({
      where: {
        id: id,
      },
      data: {
        ...updateTrackDto,
      },
    });

    return updTrack;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.prisma.track.delete({
      where: {
        id: id,
      },
    });

    // if (!track) throw new NotFoundException('Track not found.');

    // const indexTrack: number = DbService.favorites.tracks.findIndex(
    //   (artist) => artist.id === id,
    // );

    // if (index === -1) return null;

    // DbService.favorites.tracks.splice(indexTrack, 1);
  }
}
