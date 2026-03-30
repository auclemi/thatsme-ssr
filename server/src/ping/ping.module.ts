import { Module } from '@nestjs/common';
import { PingController } from './ping.controller';

@Module({
  controllers: [PingController],
  exports: [PingModule],
})
export class PingModule {}
