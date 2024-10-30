import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Schedule } from '../../show/entities/schedule.entity';
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ShowCategory, ShowStatus } from '../enum/show.enum'; 

@Entity()
export class Show {
  @PrimaryGeneratedColumn()
  showId: number;

  /**
   * 공연명
   * @example "송강필 콘서트 BIG TOUR 2024-마이구미시"
   */
  @IsNotEmpty({ message: '공연명을 입력해 주세요.' })
  @IsString()
  @Column({ unique: true })
  name: string; // 공연명

  /**
   * 카테고리
   * @example "Concert"
   */
  @IsNotEmpty({ message: '카테고리를 입력해 주세요.' })
  @IsEnum(ShowCategory, { message: '유효한 카테고리를 입력해 주세요.' })
  @Column({ type: 'enum', enum: ShowCategory })
  category: ShowCategory; // 공연 카테고리 (예: 뮤지컬, 콘서트 등)

  /**
   * 장소
   * @example "마이구미시"
   */
  @IsNotEmpty({ message: '장소를 입력해 주세요.' })
  @IsString()
  @Column({ length: 100 })
  location: string; // 공연이 열리는 장소
  
  /**
   * 공연 이미지
   * @example "https://www.google.com/imgres?q=%EC%86%A1%EA%B0%95%ED%95%84%20%EC%BD%98%EC%84%9C%ED%8A%B8&imgurl=https%3A%2F%2Fdthumb-phinf.pstatic.net%2F%3Fsrc%3D%2522http%253A%252F%252Fimage.yes24.com%252FGoods%252F95538189%252FL%2522%26type%3Dw1&imgrefurl=https%3A%2F%2Fblog.naver.com%2Fplumdda0dd%2F222387551462&docid=6LnUuwACTMhxyM&tbnid=FXOQIhpjfBziLM&vet=12ahUKEwjslZG9wbWJAxX11zQHHaO0F6IQM3oECBIQAA..i&w=270&h=400&hcb=2&itg=1&ved=2ahUKEwjslZG9wbWJAxX11zQHHaO0F6IQM3oECBIQAA"
   */
  @IsString()
  @Column({ length: 255, nullable: true })
  image: string; // 공연 이미지 URL

  /**
   * 공연 설명
   * @example "송강필의 끝내주는 콘서트"
   */
  @IsNotEmpty({ message: '공연 설명을 입력해 주세요.' })
  @IsString()
  @Column({ type: 'text', nullable: true })
  info: string; // 공연 설명

  /**
   * 공연 상태
   * @example "upcoming"
   */
  @IsNotEmpty({ message: '공연 상태를 입력해 주세요.' })
  @IsEnum(ShowStatus, { message: '유효한 공연 상태를 입력해 주세요.' })
  @Column({ type: 'enum', enum: ShowStatus })
  status: ShowStatus; // 공연 상태

  /**
   * 공연 시작 날짜
   * @example "2024-09-10"
   */
  @IsNotEmpty({message:'공연 시작 날짜를 입력해 주세요'})
  @IsDateString()
  @Column({ type: 'date' })
  startDate: Date; // 공연 시작 날짜

  /**
   * 공연 종료 날짜
   * @example "2024-09-10"
   */
  @IsNotEmpty({message:'공연 종료 날짜를 입력해 주세요'})
  @IsDateString()
  @Column({ type: 'date' })
  endDate: Date; // 공연 종료 날짜

  @OneToMany(() => Schedule, (schedule) => schedule.show)
  schedules: Schedule[];
}
