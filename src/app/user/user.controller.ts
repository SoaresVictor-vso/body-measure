import { Controller, Get, Post, Put, Delete, Param, ParseUUIDPipe, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { FindOneOptions } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/user')
export class UserController {
    constructor(private readonly userService: UserService) {

    }
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAll() {
        return await this.userService.findAll();
    }

    //Sem guards para permitir o registro de novos usuários
    @Post()
    async create(@Body() body: CreateUserDto) {
        return await this.userService.create(body)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async get(
        @Param('id', new ParseUUIDPipe()) id: string
    ) {
        return await this.userService.findOneOrFail({ where: { id } });
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateUserDto) {
        return await this.userService.update(id, body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.userService.delete(id);
    }
}
