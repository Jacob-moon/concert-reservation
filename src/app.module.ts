import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal:true,
    validationSchema:Joi.object({
    SERVER_PORT:Joi.number().default(3000),
  }),
}),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
