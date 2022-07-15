import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class FavoritesService {
  private favorites = {
    tracks: [],
    albums: [],
    artists: [],
  };

  constructor(
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
  ) {}

  addTrack(id: string) {
    const track: any = this.tracksService.tracks.find((a) => a.id === id);

    if (!track) {
      throw new UnprocessableEntityException('Track not found.');
    }
    this.favorites.tracks.push(track);
    return track;
  }

  addAlbum(id: string) {
    const album: any = this.albumsService.albums.find((a) => a.id === id);

    if (!album) {
      throw new UnprocessableEntityException('Album not found.');
    }
    this.favorites.albums.push(album);
    return album;
  }

  addArtist(id: string) {
    const artist: any = this.artistsService.artists.find((a) => a.id === id);

    if (!artist) {
      throw new UnprocessableEntityException('Artist not found.');
    }
    this.favorites.artists.push(artist);
    return artist;
  }

  findAll() {
    return this.favorites;
  }

  removeTrack(id: string): void {
    const index: number = this.favorites.tracks.findIndex(
      (track) => track.id === id,
    );
    console.log(index);

    if (index === -1) {
      throw new NotFoundException('Track not found.');
    }

    this.favorites.tracks.splice(index, 1);
  }

  removeAlbum(id: string): void {
    const index: number = this.favorites.albums.findIndex(
      (album) => album.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Album not found.');
    }

    this.favorites.albums.splice(index, 1);
  }

  removeArtist(id: string): void {
    const index: number = this.favorites.artists.findIndex(
      (artist) => artist.id === id,
    );

    if (index === -1) {
      throw new NotFoundException('Artist not found.');
    }

    this.favorites.artists.splice(index, 1);
  }
}
