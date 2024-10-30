import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Schedule } from './schedule.entity';
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum ShowCategory {
  MUSICAL = '뮤지컬',
  CONCERT = '콘서트',
  MOVIE = '영화',
}

export enum ShowStatus {
  UPCOMING = '준비중',
  RUNNING = '진행중',
  COMPLETED = '완료',
  CANCELED = '취소',
}

@Entity()
export class Show {
  @PrimaryGeneratedColumn()
  showId: number;

  @IsNotEmpty({ message: '공연명을 입력해 주세요.' })
  @IsString()
  @Column({ unique: true })
  name: string;

  @IsNotEmpty({ message: '카테고리를 입력해 주세요.' })
  @IsEnum(ShowCategory, { message: '유효한 카테고리를 입력해 주세요.' })
  @Column({ type: 'enum', enum: ShowCategory,enumName : 'ShowCategory' })
  category: ShowCategory;

  @IsNotEmpty({ message: '장소를 입력해 주세요.' })
  @IsString()
  @Column({ length: 100 })
  location: string;

  @IsString()
  @Column({ length: 255, nullable: true })
  image: string;

  @IsNotEmpty({ message: '공연 설명을 입력해 주세요.' })
  @IsString()
  @Column({ type: 'text', nullable: true })
  info: string;

  @IsNotEmpty({ message: '공연 상태를 입력해 주세요.' })
  @IsEnum(ShowStatus, { message: '유효한 공연 상태를 입력해 주세요.' })
  @Column({ type: 'enum', enum: ShowStatus,enumName : 'ShowStatus' })
  status: ShowStatus;

  @IsNotEmpty({ message: '공연 시작 날짜를 입력해 주세요' })
  @IsDateString()
  @Column({ type: 'date' })
  startDate: Date;

  @IsNotEmpty({ message: '공연 종료 날짜를 입력해 주세요' })
  @IsDateString()
  @Column({ type: 'date' })
  endDate: Date;

  @OneToMany(() => Schedule, (schedule) => schedule.show)
  schedules: Schedule[];
}
