import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity()
export class Show {
  @PrimaryGeneratedColumn()
  showId: number;

  @Column({ length: 100 })
  name: string; // 공연명

  @Column({ length: 50 })
  category: string; // 공연 카테고리 (예: 뮤지컬, 콘서트 등)

  @Column({ length: 100 })
  location: string; // 공연이 열리는 장소

  @Column({ length: 255, nullable: true })
  image: string; // 공연 이미지 URL

  @Column({ type: 'text', nullable: true })
  info: string; // 공연 설명

  @Column({ type: 'enum', enum: ['upcoming', 'running', 'completed','canceled'] })
  status: string; // 공연 상태

  @Column({ type: 'date' })
  startDate: Date; // 공연 시작 날짜

  @Column({ type: 'date' })
  endDate: Date; // 공연 종료 날짜

  @OneToMany(() => Schedule, (schedule) => schedule.show)
  schedules: Schedule[];
}
