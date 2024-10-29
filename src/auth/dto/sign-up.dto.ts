import { User } from '../../user/entities/user.entity';
import { IsNotEmpty,IsStrongPassword } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class SignUpDto extends PickType(User, [
  'email',
  'password',
  'nickname',
  'isAdmin',
]) {
  /**
   * 비밀번호 확인
   * @example "Ex@mple23"
   */
  @ApiProperty({ description: '비밀번호 확인' })
  @IsNotEmpty({ message: '비밀번호 확인을 입력해 주세요.' })
  @IsStrongPassword(
    {},
    {
      message: '비밀번호는 영문 알파벳 대, 소문자, 숫자, 특수문자(!@#$%^&*)를 포함해야 합니다.',
    },
  )
  passwordConfirm: string;
}
