import { BadRequestException, Injectable, NotFoundException, Param } from "@nestjs/common";
import { CreateShowDto } from "./dto/create-show.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Show } from "./entities/show.entity";
import { findAllShowDto } from "./dto/find-all-show.dto";

@Injectable()
export class ShowService{
  constructor(
    @InjectRepository(Show) private readonly showRepository:Repository<Show>
){}

async create(createShowDto: CreateShowDto): Promise<Show> {
  const { schedules, seats, ...restOfShow } = createShowDto;

  const existedShow = await this.showRepository.findOneBy({
    title:createShowDto.title,
  });

  if(existedShow){
    throw new BadRequestException('이미 사용 중인 공연명입니다.')
  }

  const show = await this.showRepository.save({
    ...restOfShow,
    schedules: schedules.map((schedule) => ({
      ...schedule,
      seat: {
        availableSeats: seats,
        totalSeats: seats,
      },
    })),
  });

  return show;
}

  async findAll({keyword,category}:findAllShowDto){
    const shows = await this.showRepository.find({
      where:{...(keyword&&{title:Like(`%${keyword}%`)}),
      ...(category&&{category}),
    },
  });

    return shows;
  }
 async findOne(showId:number){
    const show =await this.showRepository.findOne({
      where:{showId},
      relations:{ 
        schedules:{
          seat :true,
        },
      },
    });

    if(!show){
      throw new NotFoundException('공연을 찾을 수 없습니다.')
    }
    return show;
  }
}