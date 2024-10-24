import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModuleValidationSchema } from './configs/env-validation.config';
import { TypeOrmModuleOptions } from './configs/database.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ShowModule } from './show/show.module';
import { BookModule } from './book/book.module';
import { OrderModule } from './order/order.module';
import { PointModule } from './point/point.module';
import { TicketModule } from './ticket/ticket.module';
import { ScheduleModule } from './schedule/schedule.module';
import { SeatModule } from './seat/seat.module';
import { ScheduledseatModule } from './scheduledseat/scheduledseat.module';
import { BoxModule } from './box/box.module';
import { TheaterModule } from './theater/theater.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal:true,
    validationSchema: ConfigModuleValidationSchema,
}),
TypeOrmModule.forRootAsync(
  TypeOrmModuleOptions
),
AuthModule,
UserModule,
ShowModule,
BookModule,
OrderModule,
PointModule,
TicketModule,
ScheduleModule,
SeatModule,
ScheduledseatModule,
BoxModule,
TheaterModule,
PaymentModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
