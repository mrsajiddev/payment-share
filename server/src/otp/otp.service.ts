import { Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { Repository } from 'typeorm';
import { Otp } from './entities/otp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private readonly otpRepo: Repository<Otp>
  ) {}

  async create(createOtpDto: CreateOtpDto): Promise<Otp> {
    const { user_id, otp, ...rest } = createOtpDto; // assume you send plain OTP as `otp`
    console.table(createOtpDto);

    // Generate salt and hash
    const saltRounds = 10;
    const EXPIRATION_MINUTES = 2;
    const hashedOtp = await bcrypt.hash(otp, saltRounds);
    const now = new Date(); 
    const expiresAt = new Date(now.getTime() + EXPIRATION_MINUTES * 60000); // 2 mins later

    const otpEntity = this.otpRepo.create({
      ...rest,
      otp_hash: hashedOtp,
      expires_at: expiresAt,
      user: {id: user_id}
    });

    return await this.otpRepo.save(otpEntity);
  }

  findAll() {
    return `This action returns all otp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} otp`;
  }

  update(id: number, updateOtpDto: UpdateOtpDto) {
    return `This action updates a #${id} otp`;
  }

  remove(id: number) {
    return `This action removes a #${id} otp`;
  }
}
