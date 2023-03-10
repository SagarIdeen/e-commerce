import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Category } from "src/master/category/entity/category-entity";
import { DeepPartial } from "typeorm";

export class CreateProductDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsString()
    url: string;

    @IsNotEmpty()
    readonly categoryId: number
}