import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { SalesChild } from './entity/sales-child-entity.entity';
import { SalesMaster } from './entity/sales-master.entity.entity';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';

@Module({
  imports: [TypeOrmModule.forFeature([SalesChild, SalesMaster]), UserModule],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
