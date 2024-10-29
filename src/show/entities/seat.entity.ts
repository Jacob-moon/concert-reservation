import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,OneToMany } from 'typeorm';
import { Box } from '../../show/entities/box.entity';
import { ScheduledSeat } from '../../show/entities/scheduled-seat.entity';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  seatId: number;

  @Column({ length: 50 })
  zone: string; // 좌석의 구역

  @Column({ length: 20 })
  seatNumber: string; // 좌석 번호 (예: A1, B2)

  @Column({ type: 'int' })
  price: number; // 좌석 가격

  @ManyToOne(() => Box, (box) => box.seats)
  box: Box; // 좌석이 속한 구역

  @OneToMany(() => ScheduledSeat, (scheduledSeat) => scheduledSeat.seat)
  scheduledSeats: ScheduledSeat[]; // 좌석의 스케줄링 정보 (예약 여부 등)
}
