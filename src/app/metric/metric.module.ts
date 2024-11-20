import { Module } from '@nestjs/common';
import { MetricController } from './metric.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],  
  controllers: [MetricController],
})
export class MetricModule {}
