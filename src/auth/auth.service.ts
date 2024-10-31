import { Injectable, BadRequestException } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { DEFAULT_CUSTOMER_POINT } from 'src/constants/point.constats';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly configService:ConfigService,
    private readonly jwtService:JwtService,

    @InjectRepository(User)private readonly userRepository:Repository<User>
) {}

  async signUp(signUpDto: SignUpDto) {

    const {email,password, passwordConfirm,nickname } = signUpDto;

    const isPasswordMatched = password ===passwordConfirm;

    if (!isPasswordMatched) {
      throw new BadRequestException(
         '비밀번호와 비밀번호 확인이 일치하지 않습니다.'
      );
    }
    const existedUser= await this.userRepository.findOneBy({email});
    if(existedUser){
        throw new BadRequestException('이미 가입 된 이메일 입니다.')
    }

    const hashRound = this.configService.get<number>('PASSWORD_HASH_ROUNDS') || 10;
    const hashedPassword = await bcrypt.hash(password, hashRound);
    

    const user = await this.userRepository.save({
        email,
        password:hashedPassword,
        nickname,
        points:DEFAULT_CUSTOMER_POINT
    });

    return this.signIn(user.userId);
  }

  signIn(userId:number){
    const payload = {userId:userId};
    const accessToken = this.jwtService.sign(payload);

    return {accessToken};
  }

  async validateUser({ email,password }:SignInDto){
    const user = await this.userRepository.findOne({
      where:{email},
      select:{userId:true,password:true}
    });
    const isPasswordMatched = bcrypt.compareSync(
      password,
      user?.password ??'',
    );

    if(!user || !isPasswordMatched){
      return null;
    }
    return {userId:user.userId};
  };

}
