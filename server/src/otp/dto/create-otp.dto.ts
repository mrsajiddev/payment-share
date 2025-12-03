// src/otp/dto/create-otp.dto.ts
import { IsEnum, IsNumber } from 'class-validator';

export type OtpChannel = 'email' | 'sms';

export class CreateOtpDto {
  @IsNumber()
  user_id: number;

  @IsEnum(['email', 'sms'])
  channel: OtpChannel;
}