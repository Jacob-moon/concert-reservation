import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsArray, IsEnum, ValidateNested } from 'class-validator';
import { Show } from '../entities/show.entity';
import { ShowCategory } from '../enum/show.enum';
import { CreateScheduleDto } from './create-schedule.dto';

export class CreateShowDto extends PickType(Show, [
  'name',
  'category',
  'location',
  'image',
  'info',
  'status',
  'startDate',
  'endDate',
]) {
  @ValidateNested()
  schedules:CreateScheduleDto[];

  /**
   * 좌석 수
   * 
   */
  @Is
}
