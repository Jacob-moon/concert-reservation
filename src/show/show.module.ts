import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Show } from './entities/show.entity';
import { Schedule } from './entities/schedule.entity';
import { ShowService } from './show.service';
import { ShowController } from './show.controller';
import { Seat } from './entities/seat.entity';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Show, Schedule,Seat]),AuthModule],
  controllers: [ShowController],
  providers: [ShowService,RoleGuard],
})
export class ShowModule {}
