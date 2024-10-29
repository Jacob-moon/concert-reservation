import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUp(signUpDto: SignUpDto) {
    const { password, passwordConfirm, ...rest } = signUpDto;

    // 비밀번호와 비밀번호 확인이 일치하는지 검증
    if (password !== passwordConfirm) {
      throw new BadRequestException('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    }

    // 사용자 생성 (passwordConfirm 제외)
    const user = await this.userService.create({ ...rest, password });

    // 생성된 사용자 반환
    return user;
  }
}
