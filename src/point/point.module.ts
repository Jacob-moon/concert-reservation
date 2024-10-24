import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointService } from './point.service';
import { PointController } from './point.controller';
import { Point } from './entities/point.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Point])],
  controllers: [PointController],
  providers: [PointService],
})
export class PointModule {}
