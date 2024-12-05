import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetricEntity } from './metric.entity';
import { Repository } from 'typeorm';
import { MetricDto } from './dto/metric.dto';

@Injectable()
export class MetricService {
    constructor(
        @InjectRepository(MetricEntity)
        private readonly metricRepository: Repository<MetricEntity>
    ) { }

    async findAll() {
        console.log('findall')
        return await this.metricRepository.find({ select: ['description', 'id', 'name', 'unit'] });
    }

    async create(data: MetricDto) {
        const metric = this.metricRepository.create(data);
        return this.metricRepository.save(metric);
    }
}
