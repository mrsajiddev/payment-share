import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { MailService } from 'src/mail/mail.service';

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService,
        private readonly mailService: MailService
    ) {}    

    @Post("/create")
    async create( @Body() createUserDto: CreateUserDto  ) {
        const user = await this.userService.create(createUserDto);
        return user;
    }
}
