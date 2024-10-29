import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    TypeOrmModule.forFeature([User])],
   
  providers: [AuthService], // AuthService와 JwtStrategy 등록
  controllers: [AuthController],
  exports: [AuthService], // AuthService를 다른 모듈에서도 사용할 수 있게 설정
})
export class AuthModule {}
