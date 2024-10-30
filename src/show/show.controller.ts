import { Controller, Get, Post, Body, Param, HttpStatus } from '@nestjs/common';
import { ShowService } from './show.service';
import { CreateShowDto } from './dto/create-show.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('공연 정보')
@Controller('shows')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @Post()
  async create(@Body() createShowDto: CreateShowDto) {
    return await this.showService.create(createShowDto);
  }

  @Get()
  async findAll() {
    return await this.showService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.showService.findOne(+id);
  }
}
