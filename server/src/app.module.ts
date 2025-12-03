import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { MailModule } from './mail/mail.module';
import { OtpModule } from './otp/otp.module';
import { Otp } from './otp/entities/otp.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
     TypeOrmModule.forRoot({
      type: 'mysql', 
      host: 'localhost', 
      port: 3306, 
      username: 'root', 
      password: '', 
      database: 'payment-share',
      entities: [User, Otp],
      synchronize: false, 
    }),
    UsersModule,
    MailModule,
    OtpModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
