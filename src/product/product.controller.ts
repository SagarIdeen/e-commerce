import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}


    @Post()
    create(@Body() createProductDto: CreateProductDto){
        return this.productService.create(createProductDto);
    }

    @Get()
    getProducts(){
        return this.productService.get();
    }

    @Get(':id')
    getProduct(@Param('id') id: number){
        return this.productService.show(id)
    }

    @Patch(':id')
    update(@Param('id') id:number, @Body() updateProductDto: UpdateProductDto){
        return this.productService.update(id, updateProductDto)
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: number){
        return this.productService.delete(id)
    }
}
