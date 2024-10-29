import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import User from '../../user/entities/user.entity';
import { Order } from '../../user/entities/order.entity';
import { Schedule } from './schedule.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  ticketId: number;

  @Column({ length: 20 })
  status: string; // 티켓 상태 (예: 'confirmed', 'canceled')

  @Column({ type: 'datetime' })
  viewingDate: Date; // 공연 날짜 및 시간

  @ManyToOne(() => User, (user) => user.tickets)
  user: User; // 티켓을 구매한 사용자

  @ManyToOne(() => Order, (order) => order.tickets)
  order: Order; // 티켓이 연결된 주문

  @ManyToOne(() => Schedule, (schedule) => schedule.tickets)
  schedule: Schedule; // 티켓이 속한 공연 일정
}
