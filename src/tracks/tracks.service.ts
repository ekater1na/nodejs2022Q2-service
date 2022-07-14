import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';

@Injectable()
export class TracksService {
  private tracks: Array<Track> = [];

  create(createTrackDto: CreateTrackDto): Track {
    const newTrack: Track = {
      id: uuidv4(),
      ...createTrackDto,
    };

    this.tracks.push(newTrack);
    return newTrack;
  }

  findAll(): Track[] {
    return this.tracks;
  }

  findOne(id: string): Track {
    const track: Track = this.tracks.find((a) => a.id === id);

    if (!track) {
      throw new NotFoundException('Track not found.');
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const index: number = this.tracks.findIndex((track) => track.id === id);

    if (index === -1) {
      throw new NotFoundException('Track not found.');
    }

    const newTrack: Track = {
      id,
      ...updateTrackDto,
    };

    this.tracks[index] = newTrack;

    return newTrack;
  }

  remove(id: string): void {
    const index: number = this.tracks.findIndex((track) => track.id === id);

    if (index === -1) {
      throw new NotFoundException('Track not found.');
    }

    this.tracks.splice(index, 1);
  }
}
