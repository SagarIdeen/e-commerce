import { Category } from "src/master/category/entity/category-entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Product {
@PrimaryGeneratedColumn()
id: number;

@Column()
name: string;

@Column()
price: number;

@Column()
url: string;

@ManyToOne(()=> Category, (category)=> category.id)
category: Category

}