import { Controller, Get,HttpStatus,Request, UseGuards } from '@nestjs/common';
import {UserService} from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.juard';

@Controller('users')

@ApiTags('사용자')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  /**
   * 내 정보 조회
   * @param req 
   * @returns 
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async findMe(@Request()req){
    const userId = req.user.userId;

    const data = await this.userService.findOneById(userId);

    return{
      statusCode: HttpStatus.OK,
      message:'내 정보 조회에 성공했습니다.',
      data,
    };
  }
}
