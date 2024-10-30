import { Injectable } from "@nestjs/common";
import { CreateShowDto } from "./dto/create-show.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Show } from "./entities/show.entity";

@Injectable()
export class ShowService{
  constructor(
    @InjectRepository(Show) private readonly showRepository:Repository<Show>
){}

async create(createShowDto: CreateShowDto): Promise<Show> {
  const { schedules, seats, ...restOfShow } = createShowDto;

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

  findAll(): string{
    return 'test'
  }
  findOne(id:number):string{
    return 'test'
  }
}