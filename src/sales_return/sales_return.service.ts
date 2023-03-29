import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSalesReturn } from './dto/create-return.dto';
import { UpdateSalesReturnDto } from './dto/update-return.dto';
import { SalesReturn } from './entity/sales-return-entity.entity';

@Injectable()
export class SalesReturnService {
  @InjectRepository(SalesReturn)
  private salesReturnRepo: Repository<SalesReturn>;

  async create({
    price,
    quantity,
    reason,
    salesChild,
    status,
  }: CreateSalesReturn) {
    const newObject = this.salesReturnRepo.create({
      price,
      quantity,
      reason,
      status,
      salesChild: { id: salesChild },
    });
    return this.salesReturnRepo.save(newObject);
  }

  async getSalesReturnByUid(userId: number) {
    return await this.salesReturnRepo
      .createQueryBuilder('salesReturn')
      .leftJoinAndSelect('salesReturn.salesChild', 'salesChild')
      .leftJoinAndSelect('salesChild.product', 'product')
      .leftJoin('salesChild.salesMaster', 'salesMaster')
      .where('salesMaster.user = :userId', { userId: userId })
      .getMany();
  }

  async update(
    id: number,
    { price, quantity, reason, salesChild, status }: UpdateSalesReturnDto,
  ) {
    const salesR = await this.salesReturnRepo.findOne({ where: [{ id }] });
    if (salesR) {
      const newReturn = this.salesReturnRepo.create({
        price,
        quantity,
        reason,
        status,
        salesChild: { id: salesChild },
      });
      return this.salesReturnRepo.update(id, newReturn);
    } else {
      return `product #${id} is not found`;
    }
  }

  async delete(id: number) {
    return this.salesReturnRepo.delete(id);
  }
}
