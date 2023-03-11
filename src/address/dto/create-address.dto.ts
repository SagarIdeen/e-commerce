import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  address: string;

  @IsNotEmpty()
  readonly userId: number;
}
