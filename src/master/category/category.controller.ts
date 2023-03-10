import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService){}

    @Post()
    create(@Body() createCategoryDto : CreateCategoryDto){
        return this.categoryService.create(createCategoryDto)
    }
    @Get()
    getCategories(){
        return this.categoryService.get();
    }

    @Get(':id')
    getCategory(@Param('id') id: number){
        return this.categoryService.show(id)
    }

    @Patch(':id')
    update(@Param('id') id:number, @Body() updateCategoryDto: UpdateCategoryDto){
        return this.categoryService.update(id, updateCategoryDto)
    }

    @Delete(':id')
    deleteCategory(@Param('id') id: number){
        return this.categoryService.delete(id)
    }
}
