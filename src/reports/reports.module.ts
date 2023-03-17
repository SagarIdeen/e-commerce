import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesMaster } from 'src/sales/entity/sales-master.entity.entity';
import { Product } from 'src/product/entity/product-entity.entity';
import { SalesChild } from 'src/sales/entity/sales-child-entity.entity';
import { QueryHelper } from 'src/common/queryHelper.service';
import { AppModule } from 'src/app.module';
import { SalesReturnModule } from 'src/sales_return/sales_return.module';
import { SalesReturn } from 'src/sales_return/entity/sales-return-entity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SalesMaster, Product, SalesChild, SalesReturn]),
  ],
  providers: [ReportsService, QueryHelper],
  controllers: [ReportsController],
})
export class ReportsModule {}
