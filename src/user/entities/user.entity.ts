import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Order } from '../../user/entities/order.entity';
import { Point } from '../../user/entities/point.entity';
import { Ticket } from '../../show/entities/ticket.entity';
import { IsEmail, IsNotEmpty, IsString, IsBoolean, IsStrongPassword } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @IsNotEmpty({ message: '닉네임을 입력해 주세요.' })
  @IsString()
  @Column({ length: 50 })
  nickname: string;

  @IsNotEmpty({ message: '이메일을 입력해 주세요.' })
  @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다.' })
  @Column({ unique: true })
  email: string;

  @IsNotEmpty({ message: '비밀번호를 입력해 주세요.' })
  @IsStrongPassword({}, { message: '비밀번호는 8자 이상의 영문 알파벳 대, 소문자, 숫자, 특수문자(!@#$%^&*)를 포함해야 합니다.' })
  @Column()
  password: string;

  @IsBoolean()
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
