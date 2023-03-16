import { PartialType } from '@nestjs/swagger';
import { CreateSalesReturn } from './create-return.dto';

export class UpdateSalesReturnDto extends PartialType(CreateSalesReturn) {}
