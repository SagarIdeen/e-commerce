import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateSalesMasterDto } from './dto/create-sales.dto';
import { SalesService } from './sales.service';

@ApiTags('Sales')
@Controller('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}
  @Post()
  create(@Body() createSalesMasterDto: CreateSalesMasterDto) {
    return this.salesService.create(createSalesMasterDto);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  getOrderByUserId(@Param('userId') userId: number) {
    return this.salesService.getByUserId(userId);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.salesService.delete(id);
  }
}
