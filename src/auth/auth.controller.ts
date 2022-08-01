import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Album } from '@prisma/client';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  albumsService: any;
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() loginDto: LoginDto): Promise<Album> {
    return this.authService.signup(loginDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() createAlbumDto: any): Promise<Album> {
    return this.authService.login(createAlbumDto);
  }

  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() createAlbumDto: any): Promise<Album> {
    return this.authService.refresh(createAlbumDto);
  }
}
