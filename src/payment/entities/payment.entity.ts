import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Order } from '../../user/entities/order.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  paymentId: number;

  @Column({ type: 'int' })
  amount: number; // 결제 금액

  @Column({ type: 'int', nullable: true })
  discountAmount: number; // 할인 금액 (옵션)

  @Column({ type: 'int', nullable: true })
  finalAmount: number; // 최종 결제 금액 (할인 적용 후)

  @Column({ type: 'datetime' })
  paymentDate: Date; // 결제 일시

  @Column({ type: 'enum', enum: ['point', 'creditCard', 'account transfer'] })
  paymentMethod: string; // 결제 수단

  @OneToOne(() => Order, (order) => order.payment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' }) // 외래 키 컬럼 명시
  order: Order; // 결제와 연결된 주문
}
