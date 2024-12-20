import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionEntity } from './session.entity';
import { Between, FindOperator, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateSessionDto } from './dto/create-session.dto';
import { UserEntity } from '../user/user.entity';
import { dataSource } from 'src/data-source';
import { MeasureEntity } from '../measure/measure.entity';
import { MessageHelper } from 'src/helpers/messages.helpers';

@Injectable()
export class SessionService {
    constructor(
        @InjectRepository(SessionEntity)
        private readonly sessionRepository: Repository<SessionEntity>,
        @InjectRepository(MeasureEntity)
        private readonly measureRepository: Repository<MeasureEntity>
    ) { }

    async getByUser(userId: string, init: string, end: string, page: number) {
        const limit = 30;
        let where: { [k: string]: string | FindOperator<string> };
        let relations = null;
        if (init || end) {
            const dateFilter = this.getDateRange(init, end);
            where = { userId, date: dateFilter };
            relations = ['measures', 'measures.metric'];
        } else {
            where = { userId };
        }
        const sessions = this.sessionRepository.find({
            where,
            relations,
            order: { date: 'DESC' },
            take: limit,
            skip: page * limit
        });
        return sessions;
    }

    getDateRange(init?: string, end?: string) {
        let dateInit: Date, dateEnd: Date;
        let strDateInit: string, strDateEnd: string;
        if (init) {
            dateInit = new Date(init);

            if (!dateInit.getTime())
                throw new BadRequestException(MessageHelper.DATE_FIELD('date-init'))
            strDateInit = dateInit.toISOString().split('T')[0];
        }
        if (end) {
            dateEnd = new Date(end);
            if (!dateEnd.getTime())
                throw new BadRequestException(MessageHelper.DATE_FIELD('date-end'))
            strDateEnd = dateEnd.toISOString().split('T')[0];
        }
        let dateFilter: FindOperator<string>;

        if (dateInit && dateEnd) {
            dateFilter = Between(/* MoreThanOrEqual */(strDateInit),/*  LessThanOrEqual */(strDateEnd));
        } else if (dateInit) {
            dateFilter = MoreThanOrEqual(strDateInit);
        } else if (dateEnd) {
            dateFilter = LessThanOrEqual(strDateEnd);
        }

        return dateFilter;
    }

    /**
     * 
     * @param id 
     * @param userId Se não for informado, traz o elemento, caso contrário, verifica se o elemento é deste usuário
     * @returns 
     */
    async get(id: number, userId?: string) {
        let where: { id?: number, userId?: string };
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
