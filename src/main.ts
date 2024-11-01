import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Concert-Reservation')
    .setDescription('Document for Reservation')
    .setVersion('1.0')
    .addBearerAuth({type:'http',scheme:'bearer',bearerFormat:'JWT'})
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory,{
    swaggerOptions:{
      persistAuthorization:true,
      tagsSorter:'alpha',
      operationsSorter:'alpha'
    }
  });

  const configService =app.get(ConfigService);
  const port = configService.get<number>('SERVER_PORT',3000);

  app.setGlobalPrefix('api',{exclude:['/health-check']});

  app.useGlobalPipes(new ValidationPipe({
    transform:true,
    whitelist:true,
    forbidNonWhitelisted:true}),
  );

  await app.listen(port);
}
bootstrap();
