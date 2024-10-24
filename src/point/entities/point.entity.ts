import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Point {
  @PrimaryGeneratedColumn()
  pointId: number;

  @Column()
  value: number;

  @Column({ nullable: true })
  reason: string;

  @ManyToOne(() => User, (user) => user.pointTransactions)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
