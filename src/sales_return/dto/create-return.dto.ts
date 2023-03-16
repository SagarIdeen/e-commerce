import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSalesReturn {
  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsString()
  reason: string;

  @IsString()
  status: string;

  @IsNotEmpty()
  readonly salesChild: number;
}
