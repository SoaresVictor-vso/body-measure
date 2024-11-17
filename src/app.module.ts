import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { DatabaseExceptionFilter } from './filters/database-exception.filters';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      synchronize: false,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      migrations: [__dirname + '/migration/*{.js,.ts}'],
      migrationsRun: true
    }),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: DatabaseExceptionFilter
  }],
})

export class AppModule { }
