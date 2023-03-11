import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entity/category-entity.entity';

@Injectable()
export class CategoryService {
  @InjectRepository(Category)
  private categoryRepository: Repository<Category>;

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.save(createCategoryDto);
  }

  async get(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async show(id: number) {
    return await this.categoryRepository.findOne({ where: [{ id }] });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({ where: [{ id }] });

    return category
      ? this.categoryRepository.update(id, updateCategoryDto)
      : `Category #${id} is not found`;
  }

  async delete(id: number) {
    return this.categoryRepository.delete(id);
  }
}
