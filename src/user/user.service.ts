import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user-entity';

@Injectable()
export class UserService {
    @InjectRepository(User)
    private userRepository: Repository<User>

    async create(createUserDto: CreateUserDto){
        return await this.userRepository.save(createUserDto)
    }

    async get(): Promise<User[]>{
        return await this.userRepository.find()
    }

    async show(id: number){
        return await this.userRepository.findOne({where:[{id}]})
    }

    async update(id: number, updateUserDto: UpdateUserDto){

        const user = await this.userRepository.findOne({where:[{id}]})  

        return user? this.userRepository.update(id, updateUserDto) : `User #${id} not found`
    }

    async delete(id: number){
        return this.userRepository.delete(id)
    }
}
