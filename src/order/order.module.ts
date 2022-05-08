import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './order-detail.entity';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Module({
  // imports: [
  //   TypeOrmModule.forFeature([Order, OrderDetail])
  // ],
  // controllers: [OrderController],
  // providers: [OrderService]
})
export class OrderModule { }
