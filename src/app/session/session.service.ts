import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionEntity } from './session.entity';
import { Repository } from 'typeorm';
import { CreateSessionDto } from './dto/create-session.dto';
import { UserEntity } from '../user/user.entity';
import { dataSource } from 'src/data-source';
import { MeasureEntity } from '../measure/measure.entity';
import { error } from 'console';
import { join } from 'path';

@Injectable()
export class SessionService {
    constructor(
        @InjectRepository(SessionEntity)
        private readonly sessionRepository: Repository<SessionEntity>,
        @InjectRepository(MeasureEntity)
        private readonly measureRepository: Repository<MeasureEntity>
    ) { }

    async getByUser(userId: string) {
        const sessions = this.sessionRepository.find({ where: { userId } });
        return sessions;
    }

    /**
     * 
     * @param id 
     * @param userId Se não for informado, traz o elemento, caso contrário, verifica se o elemento é deste usuário
     * @returns 
     */
    async get(id: number, userId?: string) {
        let where : {id: number, userId?: string};
        if (userId)
            where = { id, userId };
        else
            where = { id };
        const session = this.sessionRepository.findOne({ where, relations: ['measures', 'measures.metric'] });
        return session;
    }

    async create(data: CreateSessionDto, user: Partial<UserEntity>) {
        
        return await dataSource.transaction(async (manager) => {
            const session = this.sessionRepository.create({ ...data, userId: user.id });
            const dataMeasures = data.measures;
            if (!dataMeasures.length)
                throw new BadRequestException(`Não é possível salvar uma sessão sem medidas.`);

            const savedSession = await manager.save(session);
            const sessionId = savedSession.id;
            const savedMeasures = await Promise.all(
                dataMeasures.map(async m => {
                    const measure = this.measureRepository.create({ ...m, sessionId });
                    return await manager.save(measure);
                })
            ).catch(error => {
                throw error;
            })

            return { ...savedSession, measures: savedMeasures };
        }).catch(error => {
            console.error(error);
            throw new InternalServerErrorException();
        })
    }
}
