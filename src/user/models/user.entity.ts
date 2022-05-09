import { Exclude } from "class-transformer";
import { Favorite } from "src/favorite/models/favorite.entity";
import { OrderDetail } from "src/order/order-detail.entity";
import { Order } from "src/order/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string
  @Column()
  lastName: string
  @Column({ unique: true })
  email: string

  @Column()
  address: string

  @Column()
  @Exclude()
  password: string

  // @Column()
  // @OneToMany(() => Order, order => order.user)
  // orders: Order

  @OneToMany(() => Favorite, favorite => favorite.user)
  favorites: Favorite[]
}