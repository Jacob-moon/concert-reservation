import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Show } from './entities/show.entity';
import { Schedule } from './entities/schedule.entity';
import { Seat } from './entities/seat.entity';
import { Box } from './entities/box.entity';
import { Theater } from './entities/theater.entity';
import { ScheduledSeat } from './entities/scheduled-seat.entity';
import { Ticket } from './entities/ticket.entity';
import { ShowService } from './show.service';
import { ShowController } from './show.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Show, Schedule, Seat, Box, Theater, ScheduledSeat, Ticket])],
  controllers: [ShowController],
  providers: [ShowService],
})
export class ShowModule {}
