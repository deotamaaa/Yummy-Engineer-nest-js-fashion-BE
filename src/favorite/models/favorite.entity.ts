import { Product } from "src/product/models/product.entity";
import { User } from "src/user/models/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('favorite')
export class Favorite {
  @PrimaryGeneratedColumn()
  favoriteId: number

  @ManyToOne(() => User, user => user.favorites)
  user: User

  @ManyToOne(() => Product, product => product.favorites)
  product: Product[]
}