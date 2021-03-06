import { Favorite } from "src/favorite/models/favorite.entity";
import { OrderDetail } from "src/order/order-detail.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Size } from "./size.entity";

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  productId: number

  @Column()
  productName: string

  @Column()
  productBrand: string

  @Column()
  productPrice: string

  @Column()
  productDescription: string

  @Column()
  productImage: string

  @ManyToMany(() => Size, (size) => size.sizeName, { cascade: true, eager: true })
  @JoinTable()
  sizes: Size[]

  // @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  // orderDetails: OrderDetail[]

  @OneToMany(() => Favorite, (favorite) => favorite.product)
  favorites: Favorite[]
}