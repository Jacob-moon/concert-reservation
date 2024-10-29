import { Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService{
  constructor(@InjectRepository(User) private readonly userRepository:Repository<User>,
){}

async findOneById(userId:number){
const user = await this.userRepository.findOneBy({userId});

if (!user) {
  throw new NotAcceptableException('사용자를 찾을 수 없습니다.')
}
return user;

}
}