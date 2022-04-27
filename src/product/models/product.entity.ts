import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
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

  @ManyToMany(() => Size, (size) => size.sizeName, { cascade: true })
  @JoinTable()
  sizes: Size[]
}