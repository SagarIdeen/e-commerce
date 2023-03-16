import { Test, TestingModule } from '@nestjs/testing';
import { SalesReturnController } from './sales_return.controller';

describe('SalesReturnController', () => {
  let controller: SalesReturnController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesReturnController],
    }).compile();

    controller = module.get<SalesReturnController>(SalesReturnController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
