import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './models/favorite.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>
  ) { }

  async getAllFavorite(userId: number): Promise<Favorite[]> {
    return await this.favoriteRepository.find({
      where: {
        user: userId
      },
      relations: ['product'],
    })
  }

  async addFavorite(userId: any, productId: any): Promise<any> {
    return await this.favoriteRepository.save(userId, productId)
  }
}
