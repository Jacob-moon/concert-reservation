import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Schedule } from './schedule.entity';
import { Seat } from './seat.entity';

@Entity()
export class ScheduledSeat {
  @PrimaryGeneratedColumn()
  scheduledSeatId: number;

  @Column({ default: false })
  isBooked: boolean; // 좌석 예약 여부

  @ManyToOne(() => Schedule, (schedule) => schedule.scheduledSeats)
  schedule: Schedule; // 공연 일정과의 관계

  @ManyToOne(() => Seat, (seat) => seat.scheduledSeats)
  seat: Seat; // 좌석 정보
}
