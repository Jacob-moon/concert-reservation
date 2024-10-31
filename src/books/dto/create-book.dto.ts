import { PickType } from "@nestjs/swagger";
import { Book } from "../entities/book.entity";
import { IsNumber } from "class-validator";

export class CreateBookDto extends PickType(Book, ['scheduleId']) {

  @IsNumber()
  seatId: number;
  
}
