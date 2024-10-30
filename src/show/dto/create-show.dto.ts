import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsArray, IsEnum } from 'class-validator';
import { ShowCategory, ShowStatus } from '../enum/show.enum';


export class CreateShowDto {
  /**
   * 공연 이름
   * @example "오페라의 유령"
   */
  @ApiProperty({ description: '공연 이름' })
  @IsString()
  name: string;

  /**
   * 공연 설명
   * @example "감동적인 스토리와 아름다운 음악이 어우러진 뮤지컬 공연"
   */
  @ApiProperty({ description: '공연 설명' })
  @IsString()
  description: string;

  /**
   * 카테고리
   * @example "뮤지컬"
   */
  @ApiProperty({ description: '카테고리' })
  @IsEnum(ShowCategory, { message: '유효한 카테고리를 입력해 주세요.' })
  category: ShowCategory; // 열거형 타입으로 변경

  /**
   * 공연 가격 (원 단위)
   * @example 50000
   */
  @ApiProperty({ description: '공연 가격' })
  @IsInt()
  price: number;

  /**
   * 공연 장소
   * @example "서울 예술의전당"
   */
  @ApiProperty({ description: '공연 장소' })
  @IsString()
  location: string;

  /**
   * 공연 포스터 이미지 URL
   * @example "https://example.com/poster.jpg"
   */
  @ApiProperty({ description: '포스터 이미지 URL', required: false })
  @IsOptional()
  @IsString()
  image?: string;

  /**
   * 공연 일자 목록 (ISO 형식)
   * @example ["2023-12-25T19:00:00Z", "2023-12-26T15:00:00Z"]
   */
  @ApiProperty({ description: '공연 일정 목록' })
  @IsArray()
  showingDates: string[];

  /**
   * 공연 상태
   * @example "upcoming"
   */
  @ApiProperty({ description: '공연 상태', example: ShowStatus.UPCOMING })
  @IsEnum(ShowStatus, { message: '유효한 상태를 입력해 주세요.' })
  @IsOptional()  // 생성 시 기본 값으로 설정할 경우 필수값이 아니도록 설정
  status?: ShowStatus;
}
