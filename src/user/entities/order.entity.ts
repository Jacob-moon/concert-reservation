import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany, OneToOne } from 'typeorm';
import User from './user.entity';
import { Payment } from '../../payment/entities/payment.entity';
import { Ticket } from 'src/show/entities/ticket.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  @Column({ type: 'int' })
  totalAmount: number; // 총 주문 금액

  @Column({ length: 20 })
  status: string; // 주문 상태 (예: 'confirmed', 'canceled')

  @CreateDateColumn()
  createdAt: Date; // 주문 생성 시간

  @ManyToOne(() => User, (user) => user.orders)
  user: User; // 주문을 한 사용자

  @OneToMany(() => Ticket, (ticket) => ticket.order)
  tickets: Ticket[]; // 여러 티켓 연결

  @OneToOne(() => Payment, (payment) => payment.order)
  payment: Payment; // 1:1 결제 정보, Payment 쪽에서도 Order를 참조
}
