import { Module } from '@nestjs/common';
import { MetricController } from './metric.controller';
import { UserModule } from '../user/user.module';
import { MetricService } from './metric.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricEntity } from './metric.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([MetricEntity])],
  controllers: [MetricController],
  providers: [MetricService],
  exports: [MetricService]
})
export class MetricModule { }
