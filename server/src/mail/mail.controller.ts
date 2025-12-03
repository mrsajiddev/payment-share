import { Controller, Get} from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('send-welcome-mail')
  async sendEmail() {
    return this.mailService.sendEmail(
      'sajid.algolix@gmail.com',
      'Muhammad Sajid',
      'http://localhost:3000.com/'
    );
  }
}
