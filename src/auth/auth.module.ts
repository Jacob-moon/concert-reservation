import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module'; // UserModule import 추가

@Module({
  imports: [
    UserModule, // UserModule을 import하여 UserService를 사용 가능하게 설정
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecretKey',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  providers: [AuthService, JwtStrategy], // AuthService와 JwtStrategy 등록
  controllers: [AuthController],
  exports: [AuthService], // AuthService를 다른 모듈에서도 사용할 수 있게 설정
})
export class AuthModule {}
