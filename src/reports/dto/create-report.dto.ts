import { IsOptional } from 'class-validator';

export class CreateReportDto {
  @IsOptional()
  fromDate: Date;

  @IsOptional()
  toDate: Date;

  @IsOptional()
  productId?: number;

  @IsOptional()
  categoryId?: number;
}
