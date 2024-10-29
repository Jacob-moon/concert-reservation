import { Injectable, BadRequestException } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { DEFAULT_CUSTOMER_POINT } from 'src/constants/point.constats';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)private readonly userRepository:Repository<User>
) {}

  async signUp(signUpDto: SignUpDto) {

    const { email, password, passwordConfirm, nickname, isAdmin } = signUpDto;

    const isPasswordMatched = password ===passwordConfirm;

    // 비밀번호와 비밀번호 확인이 일치하는지 검증
    if (!isPasswordMatched) {
      throw new BadRequestException(
        '비밀번호와 비밀번호 확인이 일치하지 않습니다.'
      );
    }
    const existedUser= await this.userRepository.findOneBy({email});
    if(existedUser){
        throw new BadRequestException('이미 가입 된 이메일 입니다.')
    }
    const user = await this.userRepository.save({
        email,
        password,
        nickname,
        points:DEFAULT_CUSTOMER_POINT
    });
    delete user.password;
    return user;
  }
}
