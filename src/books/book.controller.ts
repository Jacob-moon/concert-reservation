import { Controller, Get, Post, Body, Param, UseGuards, HttpStatus,Request, Delete} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/user/types/user-type.type';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('예매 정보')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  /**
   * 예매하기
   * @param createBookDto
   * @returns 
   */
  @ApiBearerAuth()
  @Roles(UserRole.Customer)
  @UseGuards(RoleGuard)
  @Post()
  async create(@Request()req,@Body() createBookDto: CreateBookDto) {
    const userId = req.user.userId;
    const data = await this.bookService.create(userId,createBookDto);

    return    {
      statusCode: HttpStatus.CREATED,
      message: '예매에 성공했습니다.',
      data,
    };
  }

  /**
   * 예매 목록 조회
   * @returns 
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const userId = req.user.userId;
    const data = await this. bookService.findAll(userId);

    return  {
      statusCode: HttpStatus.OK,
      message: '예매 목록 조회에 성공했습니다.',
      data,
    };
    ;
  }

  /**
   * 예매 상세조회
   * @param id 
   * @returns 
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':bookId')
  findOne(@Request() req,@Param('bookId') bookId: number) {
    const userId = req.user.userId;
    return this.bookService.findOne(bookId,userId);
  }

  /**
   * 예매 취소
   * @param id
   * @returns
   */
@ApiBearerAuth()
@Roles(UserRole.Customer)
@UseGuards(RoleGuard)
@Delete(':bookId')
async cancel(@Request() req, @Param('bookId') bookId: number) {
  const userId = req.user.userId;
  const data = await this.bookService.cancel(bookId, userId);
  return {
    statusCode: HttpStatus.OK,
    message: '예매가 취소되었습니다.',
    data,
  };
}
}