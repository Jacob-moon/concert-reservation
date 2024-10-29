import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Order } from '../../user/entities/order.entity';
import { Schedule } from '../../show/entities/schedule.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  ticketId: number;

  @Column({ length: 20 })
  status: string;

  @ManyToOne(() => User, (user) => user.tickets)
  user: User;

  @ManyToOne(() => Order, (order) => order.tickets)
  order: Order;

  @ManyToOne(() => Schedule, (schedule) => schedule.tickets)
  schedule: Schedule;
}
