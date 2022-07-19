import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { v4 as uuidv4 } from 'uuid';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';

@Injectable()
export class TracksService {
  create(createTrackDto: CreateTrackDto): Track {
    const newTrack: Track = {
      id: uuidv4(),
      ...createTrackDto,
    };

    DbService.tracks.push(newTrack);
    return newTrack;
  }

  findAll(): Track[] {
    return DbService.tracks;
  }

  findOne(id: string): Track {
    const track: Track = DbService.tracks.find((a) => a.id === id);

    if (!track) {
      throw new NotFoundException('Track not found.');
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const index: number = DbService.tracks.findIndex(
      (track) => track.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Track not found.');
    }

    const newTrack: Track = {
      id,
      ...updateTrackDto,
    };

    DbService.tracks[index] = newTrack;

    return newTrack;
  }

  remove(id: string): void {
    const index: number = DbService.tracks.findIndex(
      (track) => track.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Track not found.');
    }

    DbService.tracks.splice(index, 1);

    const indexTrack: number = DbService.favorites.tracks.findIndex(
      (artist) => artist.id === id,
    );

    if (index === -1) return null;

    DbService.favorites.tracks.splice(indexTrack, 1);
  }
}
