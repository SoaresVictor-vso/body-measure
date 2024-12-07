import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionEntity } from './session.entity';
import { Repository } from 'typeorm';
import { CreateSessionDto } from './dto/create-session.dto';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class SessionService {
    constructor(
        @InjectRepository(SessionEntity)
        private readonly sessionRepository: Repository<SessionEntity>
    ) { }

    async getByUser(userId: string)  {
        const sessions = this.sessionRepository.find({where: {userId}});
        return sessions;
    }

    async get(id: number) {
        const session = this.sessionRepository.findOne({where: {id}});
        return session;
    }
    
    async create(data: CreateSessionDto, user: Partial<UserEntity>) {
        const session = this.sessionRepository.create({...data, userId: user.id});
        console.log(session)
        return this.sessionRepository.save(session);
    }
}
