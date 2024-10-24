import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Order } from '../../user/entities/order.entity'; // 수정된 경로
import { Point } from '../../user/entities/point.entity'; // 수정된 경로
import { Ticket } from '../../show/entities/ticket.entity'; // 수정된 경로

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ length: 50 })
  nickname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Point, (point) => point.user)
  pointTransactions: Point[];

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];

  @CreateDateColumn()
  createdAt: Date;
}
