import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ProductModule } from './product/product.module';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'admin',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    CommonModule,
    ProductModule,
    FavoriteModule,
  ],
  controllers: [AppController, OrderController],
  providers: [AppService, OrderService],
})
export class AppModule { }
