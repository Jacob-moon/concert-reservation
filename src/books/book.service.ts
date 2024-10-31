import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { User } from 'src/user/entities/user.entity';
import { Seat } from 'src/show/entities/seat.entity';
import { Schedule } from 'src/show/entities/schedule.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)private readonly bookRepository:Repository<Book>,
    @InjectRepository(User)private readonly userRepository:Repository<User>,
    @InjectRepository(Seat)private readonly seatRepository:Repository<Seat>,
    @InjectRepository(Schedule)private readonly scheduleRepository:Repository<Schedule>,
){}

  async create(userId:number,{scheduleId}:CreateBookDto) {
    
    //공연 회차 정보 조회
    const schedule = await this.scheduleRepository.findOne({
      where:{scheduleId:scheduleId},
      relations:{
        show:true,
      },
    });
    if (!schedule){
      throw new NotFoundException('공연 회차 정보가 없습니다.')
    }
    //예매 내역 생성
    const book= await this.bookRepository.save({
      userId,
      scheduleId,
    });

    //포인트 차감

    const price =schedule.show.price;
    const user = await this.userRepository.findOneBy({userId});
    user.points =user.points -price;
    const updatedUser = await this.userRepository.save(user);

    //좌석 개수
    const seat = await this.seatRepository.findOneBy({scheduleId});
    seat.availableSeats -= 1;
    await this.seatRepository.save(seat);
    
    return book;
  }

  findAll() {
    return `This action returns all books`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }
  }