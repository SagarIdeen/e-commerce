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
    return this.product.find({
      relations: ['category'],
      //   where:[{}]
    });
    // return this.dataSource.query(
    //   'SELECT * FROM product LEFT JOIN sales_child ON product.id = sales_child.product_id;',
    // );
  }

  async reportByProductFilterDate(createReportDto: CreateReportDto) {
    let queryBasic = `SELECT product.created_at as date,product.id, product.name as product, product.price, product.url,category.name as category, category.id as categoryId  FROM category 
              INNER JOIN product 
              ON product.category_id = category.id
              WHERE`;

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
  }
  // async reportByProductFilterDate(createReportDto: CreateReportDto) {
  //   let queryBasic = `SELECT * FROM product
  //   LEFT JOIN sales_child
  //   ON product.id = sales_child.product_id WHERE`;

  //   if (createReportDto.fromDate && createReportDto.toDate) {
  //     queryBasic += `\n  product.created_at BETWEEN :fromDate AND :toDate`;
  //   }
  //   if (createReportDto.productId) {
  //     queryBasic += `\n  AND product.id = :productId`;
  //   }
  //   if (createReportDto.categoryId) {
  //     queryBasic += `\n AND category_id =:categoryId`;
  //   }

  //   const { query, params } = this.queryHelper.convertToQueryWithParameters(
  //     queryBasic,
  //     createReportDto,
  //   );
  //   return this.dataSoruce.query(query, params);
  // }

  async reportBySalesReturn(): Promise<SalesReturn[]> {
    return await this.salesReturnRepo
      .createQueryBuilder('salesReturn')
      .leftJoinAndSelect('salesReturn.salesChild', 'salesChild')
      .leftJoinAndSelect('salesChild.salesMaster', 'salesMaster')
      .leftJoinAndSelect('salesMaster.user', 'user')
      .getMany();
  }
}
