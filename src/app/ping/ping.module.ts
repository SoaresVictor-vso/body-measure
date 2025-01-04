import { Module } from '@nestjs/common';
import { PingController } from './ping.controller';

console.log('imported ping module')
@Module({
  controllers: [PingController]
})
export class PingModule {}
