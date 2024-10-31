import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserRole } from 'src/user/types/user-type.type';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleGuard extends JwtAuthGuard implements CanActivate {
  @InjectRepository(User) private readonly userRepository:Repository<User>;
  constructor(private reflector:Reflector){
    super();
  }

 async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const authenticated = await super.canActivate(context);

    if(!authenticated){
      throw new UnauthorizedException('인증 정보가 잘못되었습니다.')
    }

    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [
      context.getHandler(),
      context.getClass(),
    ],
  );

  if(!requiredRoles){
    return true;
  }

  const req = context.switchToHttp().getRequest();
  const userId = req.user.userId;
  console.log(userId,"테스트입니다")
  const user = await this.userRepository.findOneBy({userId:userId});
  const hasPermission =requiredRoles.some((role) => role === user.role);
  if(!hasPermission){
    throw new ForbiddenException('권한이 없습니다.');
  }
    return true;
  }
}
