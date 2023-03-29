import { BaseEntity } from 'src/common/database/base-entity.entity';
import { Product } from 'src/product/entity/product-entity.entity';
import { SalesReturn } from 'src/sales_return/entity/sales-return-entity.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { SalesMaster } from './sales-master.entity.entity';

@Entity()
export class SalesChild extends BaseEntity {
  @Column()
  unitPrice: number;

  @Column()
  quantity: number;

  @Column()
  subTotal: number;

  @ManyToOne(() => SalesMaster, (salesMaster) => salesMaster.salesChilds, {
    onDelete: 'CASCADE',
  })
  salesMaster: SalesMaster;

  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @OneToOne(() => SalesReturn, (salesReturn) => salesReturn.salesChild) // specify inverse side as a second parameter
  salesReturn: SalesReturn;
}
