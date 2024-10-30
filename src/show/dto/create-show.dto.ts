import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsArray, IsEnum } from 'class-validator';
import { Show } from '../entities/show.entity';
import { ShowCategory } from '../enum/show.enum';

export class CreateShowDto extends PickType(Show, [
  'name',
  'description',
  'category',
  'price',
  'location',
  'image',
  'showingDates',
  'seats',
]) {
  @ApiProperty({ description: '공연 이름', example: '오페라의 유령' })
  @IsString()
  name: string;

  @ApiProperty({ description: '공연 설명', example: '감동적인 스토리와 아름다운 음악이 어우러진 뮤지컬 공연' })
  @IsString()
  description: string;

  @ApiProperty({ description: '카테고리', enum: ShowCategory, example: ShowCategory.MUSICAL })
  @IsEnum(ShowCategory, { message: '유효한 카테고리를 입력해 주세요.' })
  category: ShowCategory;

  @ApiProperty({ description: '공연 가격 (원 단위)', example: 50000 })
  @IsInt()
  price: number;

  @ApiProperty({ description: '공연 장소', example: '서울 예술의전당' })
  @IsString()
  location: string;

  @ApiProperty({ description: '포스터 이미지 URL', required: false, example: 'https://example.com/poster.jpg' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({
    description: '공연 일정 목록 (ISO 형식)',
    example: ["2023-10-21T19:00:00Z", "2023-10-22T19:00:00Z"],
  })
  @IsArray()
  showingDates: string[];

  @ApiProperty({
    description: '좌석 정보',
    example: {
      totalSeats: 100,
      details: [
        { zone: 'A', seatNumber: 'A1', price: 20000, boxId: 1 },
        { zone: 'A', seatNumber: 'A2', price: 50000, boxId: 1 },
      ],
    },
  })
  seats: {
    totalSeats: number;
    details: {
      zone: string;
      seatNumber: string;
      price: number;
      boxId: number;
    }[];
  };
}
