import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('/product')
  reportByProduct() {
    return this.reportsService.reportByProduct();
  }

  @Get('/product/filter')
  reportByProductFilterDate(@Query() createReportDto: CreateReportDto) {
    return this.reportsService.reportByProductFilterDate(createReportDto);
  }
  // @Get('/product/filter')
  // reportByProductFilterDate(@Query() createReportDto: CreateReportDto) {
  //   return this.reportsService.reportByProductFilterDate(createReportDto);
  // }
}
