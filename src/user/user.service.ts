import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user-entity.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  async create(createUserDto: CreateUserDto) {
    const userName = await this.findByEmail(createUserDto.email);

    return userName && userName.role === 'user'
      ? 'username already exists'
      : await this.userRepository.save(createUserDto);
  }

  async createAdmin(createUserDto: CreateUserDto) {
    const userName = await this.findByEmail(createUserDto.email);

    return userName && userName.role === 'admin'
      ? 'username already exists'
      : await this.userRepository.save(createUserDto);
  }

  async get(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async show(id: number) {
    return await this.userRepository.findOne({ where: [{ id }] });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: [{ id }] });

    return user
      ? this.userRepository.update(id, updateUserDto)
      : `User #${id} not found`;
  }

  async delete(id: number) {
    return this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: [{ email }],
    });
  }
}
