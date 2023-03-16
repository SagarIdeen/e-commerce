import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesReturn } from './entity/sales-return-entity.entity';
import { SalesReturnController } from './sales_return.controller';
import { SalesReturnService } from './sales_return.service';

@Module({
  imports: [TypeOrmModule.forFeature([SalesReturn])],
  controllers: [SalesReturnController],
  providers: [SalesReturnService],
})
export class SalesReturnModule {}
