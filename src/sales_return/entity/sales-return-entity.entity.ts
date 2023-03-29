import { BaseEntity } from 'src/common/database/base-entity.entity';
import { SalesChild } from 'src/sales/entity/sales-child-entity.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class SalesReturn extends BaseEntity {
  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  reason: string;

  @Column()
  status: string;

  @OneToOne(() => SalesChild, (salesChild) => salesChild.salesReturn) // specify inverse side as a second parameter
  @JoinColumn()
  salesChild: SalesChild;
}
