import { BaseEntity } from 'src/common/database/base-entity.entity';
import { Product } from 'src/product/entity/product-entity.entity';
import { User } from 'src/user/entity/user-entity.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Cart extends BaseEntity {
  @Column()
  quantity: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Product, (product) => product.id)
  product: Product;
}
