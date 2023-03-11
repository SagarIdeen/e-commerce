import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCartDto {
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  readonly userId: number;

  @IsNotEmpty()
  readonly productId: number;
}
