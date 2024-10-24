import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Box } from './box.entity';
import { Schedule } from './schedule.entity';

@Entity()
export class Theater {
  @PrimaryGeneratedColumn()
  theaterId: number;

  @Column({ length: 100 })
  name: string; // 극장 이름

  @Column({ length: 255 })
  address: string; // 극장 주소

  @Column({ length: 100, nullable: true })
  managerName: string; // 극장 대관 담당자 이름

  @OneToMany(() => Box, (box) => box.theater)
  boxes: Box[]; // 극장 내 구역들

  @OneToMany(() => Schedule, (schedule) => schedule.theater)
  schedules: Schedule[]; // 극장에서 열리는 공연 일정들
}
