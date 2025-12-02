import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { MailService } from 'src/mail/mail.service';

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService,
        // private readonly mailService: MailService
    ) {}    

    @Post("/create")
    create( @Body() createUserDto: CreateUserDto  ) {
        const user = this.userService.create(createUserDto);
        // this.mailService.sendEmail(
        //     user.email,
        //     user.name,
        //     'http://localhost:3000.com/'
        // );
        return user;
    }
}
