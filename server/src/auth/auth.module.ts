// src/auth/auth.module.ts
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { getJwtConfig } from 'src/common/jwt_secret';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';

const { secret, expiresIn } = getJwtConfig();

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true
    }),
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: secret,
      signOptions: { expiresIn: Number(expiresIn) },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService], 
  exports: [AuthService, JwtModule],
})
export class AuthModule {}