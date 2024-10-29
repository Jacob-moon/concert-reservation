import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  create(arg0: { password: string; nickname: string; email: string; isAdmin: boolean; }) {
      throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUserById(userId: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { userId } });
  }
}
