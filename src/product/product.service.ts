import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './models/product.entity';
import { Size } from './models/size.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>
  ) { }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['sizes'] })
  }

  async getProductById(id: number): Promise<Product> {
    return await this.productRepository.findOne(id, { relations: ['sizes'] })
  }

  async getSizeById(id: number): Promise<Size> {
    return await this.sizeRepository.findOne(id)
  }
}
