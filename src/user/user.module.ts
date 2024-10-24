import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { Point } from '../point/entities/point.entity';
import { Order } from '../order/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Point, Order])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
