import { Product } from "src/product/entity/product-entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Category {
@PrimaryGeneratedColumn()
id: number;

@Column()
name: string;

// @OneToMany(()=> Product, (product) => product.category)
// category: Product
}