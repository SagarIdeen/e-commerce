import { BaseEntity } from 'src/common/database/base-entity.entity';
import { User } from 'src/user/entity/user-entity.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Address extends BaseEntity {
  @Column()
  address: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
