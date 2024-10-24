import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService, // ConfigService 주입
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'), // 환경 변수에서 시크릿 키 가져오기
    });
  }

  async validate(payload: JwtPayload) {
    const { userId } = payload;
    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user; // request.user에 반환
  }
}
