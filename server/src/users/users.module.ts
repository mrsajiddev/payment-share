import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MailModule } from 'src/mail/mail.module';
import { OtpModule } from 'src/otp/otp.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MailModule,
    OtpModule
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
