import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateSalesMasterDto } from './dto/create-sales.dto';
import { SalesChild } from './entity/sales-child-entity.entity';
import { SalesMaster } from './entity/sales-master.entity.entity';

@Injectable()
export class SalesService {
  constructor(private dataSource: DataSource) {}
  @InjectRepository(SalesChild)
  private salesChildRepository: Repository<SalesChild>;
  @InjectRepository(SalesMaster)
  private salesMasterRepository: Repository<SalesMaster>;

  async create(dto: CreateSalesMasterDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const _m = queryRunner.manager.create(SalesMaster, {
        totalAmount: dto.totalAmount,
        totalProducts: dto.totalProducts,
        user: { id: dto.userId },
        address: { id: dto.addressId },
      });
      console.log(_m);

      await queryRunner.manager.save(_m);
      const child = await Promise.all(
        dto.salesChild.map((item) => {
          return queryRunner.manager.create(SalesChild, {
            salesMaster: _m,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            subTotal: item.subTotal,
            product: { id: item.productId },
          });
        }),
      );
      await queryRunner.manager.save(child);
      await queryRunner.commitTransaction();
      return { response: 'Created' };
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  //   async getByUserId(id: number) {
  //     const master = await this.salesMasterRepository.find({
  //       where: [{ user: [{ id }] }],
  //       relations: ['salesChilds'],
  //     });
  //     const u = await this.userService.show(id);
  // return u;
  // return master;
  // const l = await Promise.all(
  //   master.map((item) => {
  //     return {
  //       id: item.id,
  //       totalAmount: item.totalAmount,
  //       totalProducts: item.totalProducts,
  //       createdAt: item.createdAt,
  //       deletedAt: item.deletedAt,
  //       updatedAt: item.updatedAt,
  //       salesChilds: item.salesChilds,
  //     };
  //   }),
  // );
  //   }
  async getByUserId(userId: number) {
    return await this.salesMasterRepository
      .createQueryBuilder('master')
      .leftJoinAndSelect('master.user', 'user')
      .leftJoinAndSelect('master.address', 'address')
      .leftJoinAndSelect('master.salesChilds', 'salesChilds')
      .leftJoinAndSelect('salesChilds.product', 'product')
      .where('master.user = :userId', { userId: userId })
      .getMany();
  }

  async delete(id: number) {
    return await this.salesMasterRepository.delete(id);
  }
}
