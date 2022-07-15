import { Injectable } from '@nestjs/common';
import { Album } from 'src/albums/interfaces/album.interface';
import { Artist } from 'src/artists/interfaces/artist.interface';
import { Track } from 'src/tracks/interfaces/track.interface';

@Injectable()
export class DbService {
  static favorites = {
    tracks: [],
    albums: [],
    artists: [],
  };

  static tracks: Array<Track> = [];
  static albums: Array<Album> = [];
  static artists: Array<Artist> = [];
}
