import { Module } from '@nestjs/common';
import { ScheduledseatService } from './scheduledseat.service';
import { ScheduledseatController } from './scheduledseat.controller';

@Module({
  controllers: [ScheduledseatController],
  providers: [ScheduledseatService],
})
export class ScheduledseatModule {}
