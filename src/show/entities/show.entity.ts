import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Schedule } from './schedule.entity';
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ShowCategory } from '../types/show-category.type';
import { scheduled } from 'rxjs';

@Entity('shows')
export class Show {
  @PrimaryGeneratedColumn({unsigned:true})
  showId: number;

  /**
   * 공연명
   * @example '임영웅 콘서트 IM HERO TOUR 2023-고양'
   */
  @IsNotEmpty({ message: '공연명을 입력해 주세요.' })
  @IsString()
  @Column({ unique: true })
  title: string;

   /**
   * 공연 설명
   * @example "히어로와 영웅시대가 함께 떠나는 IM HERO TOUR"
   */
   @IsNotEmpty({ message: '공연 설명을 입력해 주세요.' })
   @IsString()
   @Column({ type: 'text', nullable: true })
   description: string;

  /**
   * 카테고리
   * @example "Concert"
   */
  @IsNotEmpty({ message: '카테고리를 입력해 주세요.' })
  @IsEnum(ShowCategory, { message: '유효한 카테고리를 입력해 주세요.' })
  @Column({ type: 'enum', enum: ShowCategory })
  category: ShowCategory;

  /**
   * 장소
   * @example '킨텍스 1전시장 1홀'
   */
  @IsNotEmpty({ message: '장소를 입력해 주세요.' })
  @IsString()
  @Column()
  place: string;

  @Column()
  price:number;

  /**
   * 썸네일
   * @example 'https://ticketimage.interpark.com/Play/image/large/24/24013564_p.gif'
   */
  @IsString()
  @Column({nullable: true })
  thumbnail: string;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(()=>Schedule,scheduled=>scheduled.show,{cascade:true})
  schedules:Schedule[];
}
