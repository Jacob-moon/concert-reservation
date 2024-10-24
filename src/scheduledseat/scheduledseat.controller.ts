import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScheduledseatService } from './scheduledseat.service';
import { CreateScheduledseatDto } from './dto/create-scheduledseat.dto';
import { UpdateScheduledseatDto } from './dto/update-scheduledseat.dto';

@Controller('scheduledseat')
export class ScheduledseatController {
  constructor(private readonly scheduledseatService: ScheduledseatService) {}

  @Post()
  create(@Body() createScheduledseatDto: CreateScheduledseatDto) {
    return this.scheduledseatService.create(createScheduledseatDto);
  }

  @Get()
  findAll() {
    return this.scheduledseatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduledseatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScheduledseatDto: UpdateScheduledseatDto) {
    return this.scheduledseatService.update(+id, updateScheduledseatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduledseatService.remove(+id);
  }
}
