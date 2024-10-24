import { Test, TestingModule } from '@nestjs/testing';
import { ScheduledseatService } from './scheduledseat.service';

describe('ScheduledseatService', () => {
  let service: ScheduledseatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduledseatService],
    }).compile();

    service = module.get<ScheduledseatService>(ScheduledseatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
