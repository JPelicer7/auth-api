import { IsEmail, IsNotEmpty, isNotEmpty, IsString } from "class-validator"

export class SignUpDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}


export class SignInDTO {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}