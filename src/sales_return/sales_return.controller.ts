import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSalesReturn } from './dto/create-return.dto';
import { UpdateSalesReturnDto } from './dto/update-return.dto';
import { SalesReturnService } from './sales_return.service';

@ApiTags('Sales-return')
@Controller('sales-return')
export class SalesReturnController {
  constructor(private salesReturnService: SalesReturnService) {}

  @Post()
  create(@Body() createSalesReturn: CreateSalesReturn) {
    return this.salesReturnService.create(createSalesReturn);
  }

  @Get(':userId')
  getReturnbyUser(@Param('userId') userId: number) {
    return this.salesReturnService.getSalesReturnByUid(userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateSalesReturnDto: UpdateSalesReturnDto,
  ) {
    return this.salesReturnService.update(id, updateSalesReturnDto);
  }

  @Delete(':id')
  deleteReturn(@Param('id') id: number) {
    return this.salesReturnService.delete(id);
  }
}
