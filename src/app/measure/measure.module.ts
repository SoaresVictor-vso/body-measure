import { Module } from '@nestjs/common';
import { MeasureController } from './measure.controller';
import { MeasureService } from './measure.service';
import { UserModule } from '../user/user.module';
import { MetricModule } from '../metric/metric.module';

@Module({
  imports: [UserModule, MetricModule],
  controllers: [MeasureController],
  providers: [MeasureService]
})
export class MeasureModule {}
