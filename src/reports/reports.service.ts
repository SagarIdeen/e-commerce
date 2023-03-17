import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { QueryHelper } from 'src/common/queryHelper.service';
import { Product } from 'src/product/entity/product-entity.entity';
import { SalesChild } from 'src/sales/entity/sales-child-entity.entity';
import { SalesReturn } from 'src/sales_return/entity/sales-return-entity.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportsService {
  @InjectRepository(Product)
  private product: Repository<Product>;
  @InjectRepository(SalesReturn)
  private salesReturnRepo: Repository<SalesReturn>;
  @InjectRepository(SalesChild)
  private readonly salesChildRepo: Repository<SalesChild>;

  constructor(
    @InjectDataSource() private readonly dataSoruce: DataSource,
    private queryHelper: QueryHelper,
  ) {}

  async reportByProduct() {
    return this.salesChildRepo.find({
      relations: ['product', 'product.category'],
      //   where:[{}]
    });
    // return this.dataSource.query(
    //   'SELECT * FROM product LEFT JOIN sales_child ON product.id = sales_child.product_id;',
    // );
  }

  async reportByProductFilterDate(createReportDto: CreateReportDto) {
    let queryBasic = `SELECT * FROM product
    LEFT JOIN sales_child
    ON product.id = sales_child.product_id WHERE`;

    if (createReportDto.fromDate && createReportDto.toDate) {
      queryBasic += `\n  product.created_at BETWEEN :fromDate AND :toDate`;
    }
    if (createReportDto.productId) {
      queryBasic += `\n  AND product.id = :productId`;
    }
    if (createReportDto.categoryId) {
      queryBasic += `\n AND category_id =:categoryId`;
    }

    const { query, params } = this.queryHelper.convertToQueryWithParameters(
      queryBasic,
      createReportDto,
    );
    return this.dataSoruce.query(query, params);

    // if(createReportDto.fromDate && createReportDto.toDate){
    //     queryBasic += `WHERE product.id`
    // }
    // const f = new Date(from).toISOString();
    // const t = new Date(to).toISOString();
    // return this.dataSource.query(
    //   `SELECT * FROM product LEFT JOIN sales_child ON product.id = sales_child.product_id WHERE product.created_at BETWEEN '${f}' AND '${t}';`,
    // );
  }

  async reportBySalesReturn(): Promise<SalesReturn[]> {
    return await this.salesReturnRepo
      .createQueryBuilder('salesReturn')
      .leftJoinAndSelect('salesReturn.salesChild', 'salesChild')
      .leftJoinAndSelect('salesChild.salesMaster', 'salesMaster')
      .leftJoinAndSelect('salesMaster.user', 'user')
      .getMany();
  }
}
