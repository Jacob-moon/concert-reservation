import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsArray, IsEnum } from 'class-validator';

export enum ShowCategory {
  MUSICAL = '뮤지컬',
  CONCERT = '콘서트',
  MOVIE = '영화',
}

export class CreateShowDto {
  @ApiProperty({ description: '공연 이름' })
  @IsString()
  name: string;

  @ApiProperty({ description: '공연 설명' })
  @IsString()
  description: string;

  @ApiProperty({ description: '카테고리' })
  @IsEnum(ShowCategory, { message: '유효한 카테고리를 입력해 주세요.' })
  category: ShowCategory;

  @ApiProperty({ description: '공연 가격' })
  @IsInt()
  price: number;

  @ApiProperty({ description: '공연 장소' })
  @IsString()
  location: string;

  @ApiProperty({ description: '포스터 이미지 URL', required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({
    description: '공연 일정 목록',
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
