import { Controller, Get, Post, Body, Param, HttpStatus, UseGuards } from '@nestjs/common';
import { ShowService } from './show.service';
import { CreateShowDto } from './dto/create-show.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/user/types/user-type.type';
import { RoleGuard } from 'src/auth/guards/roles.guard';

@ApiTags('공연 정보')
@Controller('shows')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  /**
   * 공연 생성
   * @param createShowDto
   * @returns
   */

  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @UseGuards(RoleGuard)
  @Post()
  async create(@Body() createShowDto: CreateShowDto) {
    const data = await this.showService.create(createShowDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: '공연 생성에 성공했습니다.',
      data,
    };
  }

  /**
   * 모든 공연 목록 조회(검색)
   * @returns
   */
  @Get()
  async findAll() {
    const data = await this.showService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: '공연 목록 조회에 성공했습니다.',
      data,
    };
  }

  /**
   * 특정 상세 조회
   * @param id
   * @returns
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.showService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: '공연 조회에 성공했습니다.',
      data,
    };
  }
}
