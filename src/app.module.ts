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
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
