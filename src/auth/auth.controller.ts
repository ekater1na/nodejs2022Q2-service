import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  albumsService: any;
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() authDto: AuthDto): Promise<string> {
    return this.authService.signup(authDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() authDto: AuthDto): Promise<string> {
    return this.authService.login(authDto);
  }

  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() createAlbumDto: any): Promise<string> {
    return this.authService.refresh(createAlbumDto);
  }
}
