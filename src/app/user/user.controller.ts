import { Controller, Get, Post, Put, Delete, Param, ParseUUIDPipe, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { FindOneOptions } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/v1/user')
export class UserController {
    constructor(private readonly userService: UserService) {

    }
    @Get()
    async getAll() {
        return await this.userService.findAll();
    }

    @Post()
    async create(@Body() body: CreateUserDto) {
        return await this.userService.create(body)
    }

    @Get(':id')
    async get(
        @Param('id', new ParseUUIDPipe()) id: string
    ) {
        return await this.userService.findOneOrFail({ where: { id } });
    }

    @Put(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateUserDto) {
        return await this.userService.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.userService.delete(id);
    }
}
