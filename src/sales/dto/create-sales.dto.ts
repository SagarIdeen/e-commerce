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
  @Type(() => SalesChild)
  @ValidateNested()
  readonly salesChild: SalesChild[];
}

class SalesChild {
  @IsNumber()
  unitPrice: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  subTotal: number;

  @IsNotEmpty()
  readonly productId: number;
}
