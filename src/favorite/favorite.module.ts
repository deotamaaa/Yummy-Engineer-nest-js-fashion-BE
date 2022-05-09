import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { Favorite } from './models/favorite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite]),
    CommonModule
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule { }
