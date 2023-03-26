import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entity/cart-entity.entity';

@Injectable()
export class CartService {
  @InjectRepository(Cart)
  private cartRepository: Repository<Cart>;

  async create({ quantity, userId, productId }: CreateCartDto) {
    const newCart = await this.cartRepository.create({
      quantity,
      user: { id: userId },
      product: { id: productId },
    });
    return await this.cartRepository.save(newCart);
  }

  async get(): Promise<Cart[]> {
    return await this.cartRepository.find({ relations: ['user', 'product'] });
  }

  async getByUserId(userId: number) {
    // return await this.cartRepository.find({
    //   relations: ['user', 'product'],
    //   where: [{ user: userId }],
    // });

    return await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.user', 'user')
      .leftJoinAndSelect('cart.product', 'product')
      .where('cart.user = :userId', { userId: userId })
      .getMany();
  }

  async show(id: number) {
    return await this.cartRepository.findOne({
      where: [{ id }],
      relations: ['user', 'product'],
    });
  }

  async update(id: number, { quantity, productId, userId }: UpdateCartDto) {
    const cart = await this.cartRepository.findOne({ where: [{ id }] });
    if (cart) {
      const newCart = this.cartRepository.create({
        quantity,
        product: { id: productId },
        user: { id: userId },
      });
      return this.cartRepository.update(id, newCart);
    } else {
      return `Cart #${id} is not found`;
    }
  }

  async delete(id: number) {
    return this.cartRepository.delete(id);
  }
}
