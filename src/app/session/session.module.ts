import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { MeasureModule } from '../measure/measure.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from './session.entity';

@Module({
  imports: [UserModule, MeasureModule, TypeOrmModule.forFeature([SessionEntity])],
  providers: [SessionService],
  controllers: [SessionController]
})
export class SessionModule {}
