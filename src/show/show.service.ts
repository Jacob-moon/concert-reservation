import { Injectable, NotFoundException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Show, ShowCategory, ShowStatus } from './entities/show.entity';
import { Schedule } from './entities/schedule.entity';
import { CreateShowDto } from './dto/create-show.dto';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async create(createShowDto: CreateShowDto) {
    // 카테고리 유효성 검사
    if (!Object.values(ShowCategory).includes(createShowDto.category)) {
      throw new BadRequestException('유효한 카테고리를 입력해 주세요.');
    }

    // 새 공연 생성 및 기본 상태 설정
    const newShow = this.showRepository.create({
      ...createShowDto,
      status: ShowStatus.UPCOMING, // 기본 공연 상태 설정
    });
    const savedShow = await this.showRepository.save(newShow);

    // 스케줄 추가
    const schedules = createShowDto.showingDates.map((date) => {
      const schedule = this.scheduleRepository.create({
        showingDate: new Date(date),
        show: savedShow,
      });
      return this.scheduleRepository.save(schedule);
    });

    await Promise.all(schedules);

    return {
      statusCode: HttpStatus.CREATED,
      message: '공연 생성에 성공했습니다.',
      data: { ...savedShow, schedules },
    };
  }

  async findAll() {
    const data = await this.showRepository.find({ relations: ['schedules'] });
    return {
      statusCode: HttpStatus.OK,
      message: '공연 목록 조회에 성공했습니다.',
      data,
    };
  }

  async findOne(showId: number) {
    const show = await this.showRepository.findOne({
      where: { showId },
      relations: ['schedules'],
    });
    if (!show) throw new NotFoundException('해당 공연을 찾을 수 없습니다.');
    return {
      statusCode: HttpStatus.OK,
      message: '공연 조회에 성공했습니다.',
      data: show,
    };
  }

  async addSchedule(showId: number, scheduleData: CreateScheduleDto) {
    const showResult = await this.findOne(showId);
    const newSchedule = this.scheduleRepository.create({ ...scheduleData, show: showResult.data });
    const data = await this.scheduleRepository.save(newSchedule);
    return {
      statusCode: HttpStatus.CREATED,
      message: '스케줄 추가에 성공했습니다.',
      data,
    };
  }

  async updateShowStatus(showId: number, status: ShowStatus) {
    const show = await this.showRepository.findOne({
      where: { showId }, 
      relations: ['schedules'],
    });
    if (!show) throw new NotFoundException('해당 공연을 찾을 수 없습니다.');

    if (!Object.values(ShowStatus).includes(status)) {
      throw new BadRequestException('유효한 상태를 입력해 주세요.');
    }

    show.status = status;
    const data = await this.showRepository.save(show);
    return {
      statusCode: HttpStatus.OK,
      message: '공연 상태가 성공적으로 업데이트되었습니다.',
      data,
    };
  }
}
