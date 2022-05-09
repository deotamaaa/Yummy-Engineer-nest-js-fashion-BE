import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FavoriteService } from './favorite.service';

@Controller('favorite')
export class FavoriteController {
  constructor(
    private readonly favoriteService: FavoriteService
  ) { }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllFavorite(@Request() req: any): Promise<any> {
    return await this.favoriteService.getAllFavorite(req.user.id)
  }

  @Post('addFavorite')
  @UseGuards(AuthGuard('jwt'))
  async addFavorite(@Request() req: any, @Body() body: any) {
    return await this.favoriteService.addFavorite(req.user.id, body.productId)
  }
}
