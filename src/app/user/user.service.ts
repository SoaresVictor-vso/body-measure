import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOneOptions, DeepPartial } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async findAll() {
        return await this.userRepository.find({ select: ['email', 'id', 'name', 'role', 'username'] });
    }

    async findOneOrFail(options?: FindOneOptions<UserEntity>) {
        try {
            return await this.userRepository.findOneOrFail(options)
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async create(data: CreateUserDto) {
        const user = this.userRepository.create(data);
        console.log(user)
        return this.userRepository.save(user);
    }

    async update(id: string, data: UpdateUserDto) {
        const user = await this.findOneOrFail({ where: { id } });
        this.userRepository.merge(user, data);
        return this.userRepository.save(user);
    }

    async delete(id: string) {
        //Se não encontrar, lança 404;
        await this.findOneOrFail({ where: { id } });
        this.userRepository.softDelete({ id });
    }
}
