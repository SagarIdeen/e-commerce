import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

export class CreateSalesMasterDto {
  @IsNumber()
  totalAmount: number;

  @IsNumber()
  totalProducts: number;

  @IsNotEmpty()
  readonly userId: number;

  @IsNotEmpty()
  @Type(() => SalesChild1)
  @ValidateNested()
  readonly salesChild: SalesChild1[];
}

class SalesChild1 {
  @IsNumber()
  unitPrice: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  subTotal: number;

  @IsNotEmpty()
  readonly productId: number;
}
