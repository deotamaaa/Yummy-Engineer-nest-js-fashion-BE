import { User } from "src/user/models/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetail } from "./order-detail.entity";

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number

  // @ManyToOne(() => User, user => user.orders)
  // @JoinTable({
  //   name: 'user_order'
  // })
  // @Column()
  // user: User

  @Column()
  orderDate: Date

  // @Column()
  // @OneToMany(() => OrderDetail, orderDetail => orderDetail.order)
  // orderDetails: OrderDetail[]

}