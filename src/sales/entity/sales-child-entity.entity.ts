import { BaseEntity } from 'src/common/database/base-entity.entity';
import { Product } from 'src/product/entity/product-entity.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
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
}
