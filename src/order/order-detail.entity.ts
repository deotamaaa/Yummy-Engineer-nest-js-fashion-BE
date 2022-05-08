import { Product } from "src/product/models/product.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity('order_details')
export class OrderDetail {
  @PrimaryGeneratedColumn()
  orderDetailId: number;

  // @ManyToOne(() => Order, order => order.orderDetails)
  // @JoinTable({
  //   name: "order_orderDetail",
  // })
  // order: Order;

  // @ManyToOne(() => Product, product => product.orderDetails)
  // @Column()
  // product: Product;
}