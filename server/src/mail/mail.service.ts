import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  /**
   * Send otp email using Handlebars template
   */
  async sendOTPEmail(to: string, name: string, actionUrl: string, otp: string) {

    try {
      const result = await this.mailerService.sendMail({
        to,
        subject: 'Welcome to Our Service!',
        template: 'welcome', // src/mail/templates/welcome.hbs
        context: {
          name,
          actionUrl,
          otp
        },
      });

      return {
        "status": "success",
        "message": "Welcome email sent!",
        "code": "200"
      };
    } catch (error) {
      console.error('Error sending template email:', error);
      throw error(error)
    }
  }

  /**
   * Send a simple test email (no template)
   */
  async sendTestEmail(to: string) {
    try {
      const result = await this.mailerService.sendMail({
        to,
        subject: 'Hello from NestJS!',
        text: 'This is a test email.',
        html: '<b>This is a test email.</b>',
      });
      console.log('Test email sent:', result);
      return 'Test email sent successfully!';
    } catch (error) {
      console.error('Error sending test email:', error);
      return 'Failed to send test email.';
    }
  }
}
