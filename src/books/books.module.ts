import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from 'src/show/entities/schedule.entity';
import { User } from 'src/user/entities/user.entity';
import { Book } from './entities/book.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Book,User,Schedule])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
