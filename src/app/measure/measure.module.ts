import { Module } from '@nestjs/common';
import { MeasureController } from './measure.controller';
import { MeasureService } from './measure.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [MeasureController],
  providers: [MeasureService]
})
export class MeasureModule {}
