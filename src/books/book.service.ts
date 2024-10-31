import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { DataSource, Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { User } from 'src/user/entities/user.entity';
import { Seat } from 'src/show/entities/seat.entity';
import { Schedule } from 'src/show/entities/schedule.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookService {
  constructor(
    private readonly dataSource:DataSource,
    @InjectRepository(Book) private readonly bookRepository:Repository<Book>,
){}

async create(userId: number, { scheduleId, seatId }: CreateBookDto) {
  const queryRunner = this.dataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    // 공연 회차 정보 조회
    const schedule = await queryRunner.manager.findOne(Schedule, {
      where: { scheduleId: scheduleId },
      relations: {
        show:true,
        seat:true,
      },
    });
    if (!schedule) {
      throw new NotFoundException('공연 회차 정보가 없습니다.');
    }

    console.log(seatId)
    // 좌석 지정 확인 및 업데이트
    const selectedSeat = await queryRunner.manager.findOne(Seat, {
      where: { 
        scheduleId,
        seatsId:seatId,
        },
    });

      console.log(selectedSeat,"테스트")
    if (!selectedSeat || !selectedSeat.isAvailable) {
      throw new BadRequestException('선택한 좌석이 이미 예약되었습니다.');
    }
    selectedSeat.isAvailable = false;
    await queryRunner.manager.save(Seat, selectedSeat);

    // 예매 내역 생성
    const book = await queryRunner.manager.save(Book, {
      userId,
      scheduleId,
      seatId, 
    });

    // 포인트 차감
    const price = schedule.show.price;
    const user = await queryRunner.manager.findOneBy(User, { userId });

    const afterPaidPoints = user.points - price;
    if (afterPaidPoints < 0) {
      throw new BadRequestException('포인트가 부족합니다.');
    }
    user.points -= price;
    await queryRunner.manager.save(User, user);

    await queryRunner.commitTransaction();
    await queryRunner.release();

    return book;
  } catch (err) {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
    console.error(err);
    throw err;
  }
}

 async findAll(userId:number) {
    const books = await this.bookRepository.find({
      where:{userId},
      relations:{
        schedule:{
          show:true,
        },
      },
    });
    return books;
  }

  async findOne(bookId: number,userId:number) {
    const book = await this.bookRepository.findOne({
      where:{bookId,userId},
      relations:{
        schedule:{
          show:true,
        },
      },
    });
    if(!book){
      throw new NotFoundException('예매 정보를 찾을 수 없습니다.');
    }
    return book;
  }

async cancel(bookId: number, userId: number) {
  const queryRunner = this.dataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    // 예매 정보 조회
    const book = await queryRunner.manager.findOne(Book, {
      where: {bookId},
      relations: { 
        schedule: {
          show:true
        }, 
      },
    });

    console.log(book);

    if (!book) {
      throw new NotFoundException('예매 정보를 찾을 수 없습니다.');
    }

    if(userId !== book.userId){
      throw new NotFoundException('취소는 본인만 가능합니다.')
    }

    // 공연 시작 3시간 전만 취소 가능
    const currentTime = new Date();
    const scheduleTime = new Date(`${book.schedule.date}T${book.schedule.time}`);
    const threeHoursBefore = new Date(scheduleTime.getTime() - 3 * 60 * 60 * 1000);
    if (currentTime > threeHoursBefore) {
      throw new BadRequestException('공연 시작 3시간 전까지만 취소 가능합니다.');
    }

    // 포인트 환불
    const user = await queryRunner.manager.findOne(User, { where: { userId } });
    user.points += book.schedule.show.price;
    await queryRunner.manager.save(User, user);

    // 좌석 개수 증가
    const seat = await queryRunner.manager.findOne(Seat, { where: { scheduleId: book.schedule.scheduleId } });
    seat.availableSeats += 1;
    await queryRunner.manager.save(Seat, seat);

    // 예매 내역 삭제
    await queryRunner.manager.delete(Book, { bookId });

    await queryRunner.commitTransaction();
    await queryRunner.release();

    return { bookId, userId };
  } catch (err) {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
    throw err;
  }
}
}