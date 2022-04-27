import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Product } from './models/product.entity';
import { Size } from './models/size.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Size]), CommonModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule { }
