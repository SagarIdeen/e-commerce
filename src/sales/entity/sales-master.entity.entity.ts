import { Address } from 'src/address/entity/address-entity.entity';
import { BaseEntity } from 'src/common/database/base-entity.entity';
import { User } from 'src/user/entity/user-entity.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { SalesChild } from './sales-child-entity.entity';

@Entity()
export class SalesMaster extends BaseEntity {
  @Column()
  totalAmount: number;

  @Column()
  totalProducts: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Address, (address) => address.id)
  address: Address;

  @OneToMany(() => SalesChild, (salesChild) => salesChild.salesMaster)
  salesChilds: SalesChild[];
}
