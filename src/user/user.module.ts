import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module'; 
import { Book } from 'src/books/entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,Book]),
    forwardRef(() => AuthModule), 
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], 
})
export class UserModule {}