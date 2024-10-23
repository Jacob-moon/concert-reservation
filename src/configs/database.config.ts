import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";

export const TypeOrmModuleOptions: TypeOrmModuleAsyncOptions = {
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory: (ConfigService:ConfigService) => ({
      type: 'mysql',
      host: ConfigService.get<string>('DB_HOST'),
      port: ConfigService.get<number>('DB_PORT'),
      username: ConfigService.get<string>('DB_USERNAME'),
      password: ConfigService.get<string>('DB_PASSWORD'),
      database: ConfigService.get<string>('DB_DATABASE'),
      synchronize: ConfigService.get<boolean>('DB_SYNC'),
      autoLoadEntities:true,
      logging:true,
    }),
  }