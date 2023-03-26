import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entity/address-entity.entity';

@Injectable()
export class AddressService {
  @InjectRepository(Address)
  private addresddRepository: Repository<Address>;

  async create({ address, userId }: CreateAddressDto) {
    const newAddress = await this.addresddRepository.create({
      address,
      user: { id: userId },
    });
    return await this.addresddRepository.save(newAddress);
  }

  async get(): Promise<Address[]> {
    return await this.addresddRepository.find({ relations: ['user'] });
  }

  async show(id: number) {
    return await this.addresddRepository.find({
      where: [{ user: { id } }],
      relations: ['user'],
    });
  }

  async update(id: number, { address, userId }: UpdateAddressDto) {
    const addrs = await this.addresddRepository.findOne({ where: [{ id }] });
    if (addrs) {
      const newAdrs = this.addresddRepository.create({
        address,
        user: { id: userId },
      });
      return this.addresddRepository.update(id, newAdrs);
    } else {
      return `Address #${id} is not found`;
    }
  }

  async delete(id: number) {
    return this.addresddRepository.delete(id);
  }
}
