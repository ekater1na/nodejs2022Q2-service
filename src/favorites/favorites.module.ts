import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TracksModule } from 'src/tracks/tracks.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { AlbumsModule } from 'src/albums/albums.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [TracksModule, ArtistsModule, AlbumsModule],
})
export class FavoritesModule {}
