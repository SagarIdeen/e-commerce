import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user-entity';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './master/category/category.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Category } from './master/category/entity/category-entity';
import { Product } from './product/entity/product-entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user1',
      password: 'changeme',
      database: 'ECommerce',
      entities: [User, Category, Product],
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy()
    }),
    UserModule,
    AuthModule,
    ProductModule,
    CategoryModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
