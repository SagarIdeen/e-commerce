import { Body, Controller, Post,Get, Param, Patch, Delete } from '@nestjs/common';
import { number } from 'yargs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor( private userService: UserService){}

    @Post()
    create(@Body() createUserDto: CreateUserDto){
        return this.userService.create(createUserDto);
    }

    @Get()
    getUsers(){
        return this.userService.get();
    }

    @Get(':id')
    getUser(@Param('id') id: number){
        return this.userService.show(id)
    }

    @Patch(':id')
    update(@Param('id') id:number, @Body() UpdateUserDto: UpdateUserDto){
        return this.userService.update(id, UpdateUserDto)
    }

    @Delete(':id')
    deleteUser(@Param('id') id: number){
        return this.userService.delete(id)
    }
}