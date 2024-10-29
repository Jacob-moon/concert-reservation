import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Payment } from './entities/payment.entity';
import { Order } from '../user/entities/order.entity'; // Order 추가 필요 시

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Order])], // Order와 Payment 추가
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
