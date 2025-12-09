import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bycrypt from 'bcrypt';
import { response } from 'src/common/response';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService, 

        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ){}
    
    getToken(user: { id: number; email: string }) {
        const payload = { userId: user.id, email: user.email };        
        const token = this.jwtService.sign(payload);        
        return { token, payload };
    }

    async login(payload: { email: string, password: string }) {
        const userRecord = await this.userRepo.findOne({
            where: { email: payload.email }
        });

        if( !userRecord ) {
            return response(false, "User not found!", {});
        }

        const passwordMatched = await bycrypt.compare(payload.password, userRecord.password);
        if( !passwordMatched ) {
            return response(false, "Enter correct password!", {});
        }

        const tokenPayload = {id : userRecord.id, email: userRecord.email}
        const tokenResponse = this.getToken(tokenPayload);

        return response(true, "User logged in successfully!", {
            user: userRecord,
            token: tokenResponse.token
        });
    }
}
