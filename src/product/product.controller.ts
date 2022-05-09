import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {

  constructor(
    private productService: ProductService,
  ) { }

  @Get()
  async getAllProducts() {
    return await this.productService.getAllProducts()
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.productService.getProductById(id)
  }

  

}
