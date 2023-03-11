import { BaseEntity } from 'src/common/database/base-entity.entity';
import { Category } from 'src/master/category/entity/category-entity.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  url: string;

  @ManyToOne(() => Category, (category) => category.id)
  category: Category;
}
