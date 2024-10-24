import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Point {
  @PrimaryGeneratedColumn()
  pointId: number;

  @Column({ type: 'int' })
  value: number; // 포인트 금액

  @Column({ nullable: true })
  reason: string; // 포인트 사용 이유

  @CreateDateColumn()
  createdAt: Date; // 포인트 트랜잭션 시간

  @ManyToOne(() => User, (user) => user.pointTransactions)
  user: User; // 포인트와 연결된 사용자
}
