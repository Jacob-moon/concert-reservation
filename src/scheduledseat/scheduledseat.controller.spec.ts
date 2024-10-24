import { Test, TestingModule } from '@nestjs/testing';
import { ScheduledseatController } from './scheduledseat.controller';
import { ScheduledseatService } from './scheduledseat.service';

describe('ScheduledseatController', () => {
  let controller: ScheduledseatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduledseatController],
      providers: [ScheduledseatService],
    }).compile();

    controller = module.get<ScheduledseatController>(ScheduledseatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
