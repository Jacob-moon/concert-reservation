import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Theater } from '../../show/entities/theater.entity';
import { Seat } from '../../show/entities/seat.entity';

@Entity()
export class Box {
  @PrimaryGeneratedColumn()
  boxId: number;

  @Column({ length: 50, nullable: true })
  zoneType: string; // 좌석 등급 (예: VIP, 일반석 등)

  @Column({ type: 'int', nullable: true })
  seatCount: number; // 구역 내 좌석 수

  @ManyToOne(() => Theater, (theater) => theater.boxes)
  theater: Theater; // 해당 구역이 속한 극장

  @OneToMany(() => Seat, (seat) => seat.box)
  seats: Seat[]; // 구역 내 좌석들
}
