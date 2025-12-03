import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { OtpService } from 'src/otp/otp.service';
import { CreateOtpDto } from 'src/otp/dto/create-otp.dto';
import { MailService } from 'src/mail/mail.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor( 
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
        private readonly otpService: OtpService,
        private readonly mailService: MailService,
     ){}
     
    async create(createUserDto: CreateUserDto): Promise<User> {
        const { password, ...rest } = createUserDto;
        const dynamicOTP = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = this.userRepo.create({
            ...rest,
            password: hashedPassword,
        });

        const newUser = await this.userRepo.save(user);

        if (newUser) {
            await this.mailService.sendOTPEmail(
                newUser.email,
                newUser.fullName,
                'http://localhost:3000/',
                dynamicOTP,
            );

            await this.otpService.create({
                user_id: newUser.id,
                channel: 'email',
                otp: dynamicOTP,
            });
        }
        return newUser;
    }
}
