import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { IsEmail, IsNotEmpty, IsString, IsBoolean, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Book } from 'src/books/entities/book.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({unsigned:true})
  userId: number;

    /**
   * 이메일
   * @example "example@example.com"
   * 
   */
    @IsNotEmpty({ message: '이메일을 입력해 주세요.' })
    @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다.' })
    @Column({ unique: true })
    email: string;

      /**
   * 비밀번호
   * @example "!Ex@mple234"
   */
  @IsNotEmpty({ message: '비밀번호를 입력해 주세요.' })
  @IsStrongPassword({}, { message: '비밀번호는 8자 이상의 영문 알파벳 대, 소문자, 숫자, 특수문자(!@#$%^&*)를 포함해야 합니다.' })
  @Column({select:false})
  password: string;

  /**
   * 닉네임
   * @example "고객"
   */
  @ApiProperty()
  @IsNotEmpty({ message: '닉네임을 입력해 주세요.' })
  @IsString()
  @Column()
  nickname: string;

  @Column({unsigned:true})
  points:number;

  @IsBoolean()
  @Column({ default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @OneToMany((type):typeof Book=>Book,(book):User=>book.user)
  books:Book[];
}
