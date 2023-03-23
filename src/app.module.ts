import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user-entity.entity';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './master/category/category.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Category } from './master/category/entity/category-entity.entity';
import { Product } from './product/entity/product-entity.entity';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/entity/cart-entity.entity';
import { AddressModule } from './address/address.module';
import { Address } from './address/entity/address-entity.entity';
import { SalesModule } from './sales/sales.module';
import { SalesChild } from './sales/entity/sales-child-entity.entity';
import { SalesMaster } from './sales/entity/sales-master.entity.entity';
// import { DataSource } from 'typeorm';
import { ReportsModule } from './reports/reports.module';
import { QueryHelper } from './common/queryHelper.service';
import { SalesReturnModule } from './sales_return/sales_return.module';
import { SalesReturn } from './sales_return/entity/sales-return-entity.entity';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user1',
      password: 'changeme',
      database: 'ECommerce',
      entities: [
        User,
        Category,
        Product,
        Cart,
        Address,
        SalesChild,
        SalesMaster,
        SalesReturn,
      ],
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
      logging: true,
    }),
    UserModule,
    AuthModule,
    ProductModule,
    CategoryModule,
    CartModule,
    AddressModule,
    SalesModule,
    ReportsModule,
    SalesReturnModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  // exports: [QueryHelper],
})
export class AppModule {
  // constructor(dataSource: DataSource) {}
}
