import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/master/category/entity/category-entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entity/product-entity';

@Injectable()
export class ProductService {
  @InjectRepository(Product)
  private productRepository: Repository<Product>;

  //   async create({ name, price, url, categoryId }: CreateProductDto) {
  //     const newProduct = new Product();
  //     const newC = new Category();
  //     newC.id = categoryId;
  //     newProduct.name = name;
  //     newProduct.price = price;
  //     newProduct.url = url;
  //     newProduct.category = newC;

  //     return this.productRepository.save(newProduct);
  //   }

  async create({ name, categoryId, price, url }: CreateProductDto) {
    const newProduct = this.productRepository.create({
      name,
      category: { id: categoryId },
      price,
      url,
    });

    return this.productRepository.save(newProduct);
  }

  async get(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['category'] });
  }

  async show(id: number) {
    return await this.productRepository.findOne({
      where: [{ id }],
      relations: ['category'],
    });
  }

  async update(id: number, { name, categoryId, price, url }: UpdateProductDto) {
    const category = await this.productRepository.findOne({ where: [{ id }] });
    if (category) {
      const newProduct = this.productRepository.create({
        name,
        category: { id: categoryId },
        price,
        url,
      });
      return this.productRepository.update(id, newProduct);
    } else {
      return `Product #${id} is not found`;
    }

    // return category
    //   ? this.productRepository.update(id, updateProductDto)
    //   : `Product #${id} is not found`;
  }

  async delete(id: number) {
    return this.productRepository.delete(id);
  }
}
