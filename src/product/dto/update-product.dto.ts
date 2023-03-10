import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  name?: string;

  @IsNumber()
  price?: number;

  @IsString()
  url?: string;

  @IsNotEmpty()
  readonly categoryId?: number;
}
