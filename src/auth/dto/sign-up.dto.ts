import { PickType } from '@nestjs/mapped-types';
import { User } from '../../user/entities/user.entity';
import { IsNotEmpty, IsStrongPassword, IsString, IsBoolean } from 'class-validator';

export class SignUpDto extends PickType(User, [
  'email',
  'password',
  'nickname',
  'isAdmin',
]) {
  @IsNotEmpty({ message: '닉네임을 입력해 주세요.' })
  @IsString()
  nickname: string;

  @IsNotEmpty({ message: '비밀번호 확인을 입력해 주세요.' })
  @IsStrongPassword(
    {},
    {
      message: '비밀번호는 영문 알파벳 대, 소문자, 숫자, 특수문자(!@#$%^&*)를 포함해야 합니다.',
    },
  )
  passwordConfirm: string;

  @IsBoolean()
  isAdmin: boolean;
}
