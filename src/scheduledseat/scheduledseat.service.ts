import { Injectable } from '@nestjs/common';
import { CreateScheduledseatDto } from './dto/create-scheduledseat.dto';
import { UpdateScheduledseatDto } from './dto/update-scheduledseat.dto';

@Injectable()
export class ScheduledseatService {
  create(createScheduledseatDto: CreateScheduledseatDto) {
    return 'This action adds a new scheduledseat';
  }

  findAll() {
    return `This action returns all scheduledseat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scheduledseat`;
  }

  update(id: number, updateScheduledseatDto: UpdateScheduledseatDto) {
    return `This action updates a #${id} scheduledseat`;
  }

  remove(id: number) {
    return `This action removes a #${id} scheduledseat`;
  }
}
