import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsDateString, IsInt, IsString } from 'class-validator';

export class CreateScheduleDto extends PickType{Schedule,['']
  /**
   * 공연 일자 (ISO 형식)
   * 예시: "2023-12-25T19:00:00Z"
   */
  @ApiProperty({ description: '공연 일자', example: '2023-12-25T19:00:00Z' })
  @IsDateString()
  showingDate: string;

  /**
   * 총 좌석 수
   * 예시: 100
   */
  @ApiProperty({ description: '총 좌석 수', example: 100 })
  @IsInt()
  totalSeats: number;

  /**
   * 극장 ID
   * 예시: "1234"
   */
  @ApiProperty({ description: '극장 ID', example: '1234' })
  @IsString()
  theaterId: string;
}
