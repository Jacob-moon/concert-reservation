import { PartialType } from '@nestjs/mapped-types';
import { CreateScheduledseatDto } from './create-scheduledseat.dto';

export class UpdateScheduledseatDto extends PartialType(CreateScheduledseatDto) {}
