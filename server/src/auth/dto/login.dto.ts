import { IsEmail, IsNotEmpty } from "class-validator";

export class loginData {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}